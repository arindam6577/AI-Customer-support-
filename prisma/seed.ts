import { PrismaClient, Role, AvailabilityStatus, TicketPriority } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  const teams = await Promise.all(['Technical Support', 'Billing Support', 'Account Support', 'Security Team', 'Customer Success'].map(name => prisma.team.upsert({ where: { name }, update: {}, create: { name, description: `${name} response team` } })));
  const admin = await prisma.user.upsert({ where: { email: 'admin@support.local' }, update: {}, create: { name: 'Maya Chen', email: 'admin@support.local', passwordHash: await bcrypt.hash('demo1234', 10), role: Role.ADMIN } });
  const agentUser = await prisma.user.upsert({ where: { email: 'alex@support.local' }, update: {}, create: { name: 'Alex Morgan', email: 'alex@support.local', passwordHash: await bcrypt.hash('demo1234', 10), role: Role.AGENT, teamId: teams[0].id } });
  await prisma.agent.upsert({ where: { userId: agentUser.id }, update: {}, create: { userId: agentUser.id, teamId: teams[0].id, availabilityStatus: AvailabilityStatus.AVAILABLE } });
  const customer = await prisma.customer.upsert({ where: { email: 'rahul@example.com' }, update: {}, create: { name: 'Rahul Sharma', email: 'rahul@example.com', company: 'Northstar Labs' } });
  const agent = (await prisma.agent.findUnique({ where: { userId: agentUser.id } }))!;
  const seededTicket = await prisma.ticket.upsert({ where: { ticketNumber: 'SUP-1001' }, update: {}, create: { ticketNumber: 'SUP-1001', customerId: customer.id, subject: 'Unable to access workspace', description: 'The workspace returns an error after I sign in.', source: 'WEB_FORM', category: 'Login & Authentication', priority: TicketPriority.HIGH, sentiment: 'NEGATIVE', status: 'ASSIGNED', assignedAgentId: agent.id, assignedTeamId: teams[0].id, aiConfidence: 0.96, humanApprovalRequired: false, messages: { create: { senderType: 'CUSTOMER', message: 'The workspace returns an error after I sign in.', channel: 'WEB_FORM' } } } });
  await Promise.all([{ priority: 'CRITICAL', firstResponseMinutes: 15, resolutionMinutes: 120 }, { priority: 'HIGH', firstResponseMinutes: 30, resolutionMinutes: 480 }, { priority: 'MEDIUM', firstResponseMinutes: 240, resolutionMinutes: 1440 }, { priority: 'LOW', firstResponseMinutes: 720, resolutionMinutes: 4320 }].map(sla => prisma.sLA.upsert({ where: { priority: sla.priority as TicketPriority }, update: sla, create: sla })));
  const policy = await prisma.sLA.findUnique({ where: { priority: seededTicket.priority } });
  if (policy) await prisma.sLARecord.upsert({ where: { ticketId: seededTicket.id }, update: {}, create: { ticketId: seededTicket.id, firstResponseDeadline: new Date(Date.now() + policy.firstResponseMinutes * 60_000), resolutionDeadline: new Date(Date.now() + policy.resolutionMinutes * 60_000) } });
  await prisma.knowledgeBase.upsert({ where: { id: 'kb-double-charge' }, update: {}, create: { id: 'kb-double-charge', title: 'Duplicate payment charge checklist', category: 'Billing', keywords: 'double charge payment duplicate billing', content: 'Ask the customer for the order number and transaction date. Never promise a refund until the billing team confirms the transaction.' } });
  console.log(`Seeded ${admin.email}`);
}
main().finally(() => prisma.$disconnect());