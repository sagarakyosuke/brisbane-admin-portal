export interface Item {
  id: number;
  name: string;
  type: string;
  version: string;
  status: string;
  updated: string;
  [key: string]: string | number;
}

export const itemColumns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 140
  },
  {
    id: 'version',
    label: 'Version',
    minWidth: 110
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120
  },
  {
    id: 'updated',
    label: 'Date Updated',
    minWidth: 150
  }
];

export const itemRows: Item[] = [
  {
    id: 1,
    name: 'Item Alpha',
    type: 'Document',
    version: '1.0.0',
    status: 'Active',
    updated: '2026-11-20'
  },
  {
    id: 2,
    name: 'Item Bravo',
    type: 'Template',
    version: '1.2.0',
    status: 'Pending',
    updated: '2026-11-19'
  },
  {
    id: 3,
    name: 'Item Charlie',
    type: 'Spreadsheet',
    version: '2.0.0',
    status: 'Active',
    updated: '2026-11-18'
  },
  {
    id: 4,
    name: 'Item Delta',
    type: 'Document',
    version: '1.1.0',
    status: 'Inactive',
    updated: '2026-11-17'
  },
  {
    id: 5,
    name: 'Item Echo',
    type: 'Template',
    version: '1.0.5',
    status: 'Active',
    updated: '2026-11-16'
  },
  {
    id: 6,
    name: 'Item Foxtrot',
    type: 'Spreadsheet',
    version: '2.1.0',
    status: 'Pending',
    updated: '2026-11-15'
  },
  {
    id: 7,
    name: 'Item Golf',
    type: 'Document',
    version: '1.3.0',
    status: 'Active',
    updated: '2026-11-14'
  },
  {
    id: 8,
    name: 'Item Hotel',
    type: 'Template',
    version: '1.1.0',
    status: 'Inactive',
    updated: '2026-11-13'
  },
  {
    id: 9,
    name: 'Item India',
    type: 'Spreadsheet',
    version: '2.2.0',
    status: 'Active',
    updated: '2026-11-12'
  },
  {
    id: 10,
    name: 'Item Juliet',
    type: 'Document',
    version: '1.4.0',
    status: 'Pending',
    updated: '2026-11-11'
  }
];
