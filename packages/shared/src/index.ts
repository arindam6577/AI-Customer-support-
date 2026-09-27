export const ticketPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export const ticketStatuses = ['NEW', 'AI_PROCESSING', 'OPEN', 'ASSIGNED', 'WAITING_FOR_CUSTOMER', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED', 'CLOSED'] as const;
export type TicketPriority = typeof ticketPriorities[number];
export type TicketStatus = typeof ticketStatuses[number];