export interface Staff {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  [key: string]: string | number;
}

export const staffColumns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 220
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 140
  },
  {
    id: 'department',
    label: 'Department',
    minWidth: 150
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 110
  }
];

export const staffRows: Staff[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Administrator',
    department: 'Operations',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    role: 'Manager',
    department: 'Logistics',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Editor',
    department: 'Marketing',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Staff',
    department: 'Warehouse',
    status: 'Active'
  },
  {
    id: 5,
    name: 'David Taylor',
    email: 'david.taylor@example.com',
    role: 'Manager',
    department: 'Operations',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Jessica Davis',
    email: 'jessica.davis@example.com',
    role: 'Staff',
    department: 'Logistics',
    status: 'Inactive'
  },
  {
    id: 7,
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    role: 'Editor',
    department: 'Marketing',
    status: 'Active'
  },
  {
    id: 8,
    name: 'Amanda Garcia',
    email: 'amanda.garcia@example.com',
    role: 'Staff',
    department: 'Warehouse',
    status: 'Active'
  }
];
