export const dashboardStats = [
  { label: 'Total Borrowed Books', value: '2,567', change: '+12%' },
  { label: 'Total Returned Books', value: '2,234', change: '+8%' },
  { label: 'Total User Base', value: '1,843', change: '+15%' },
  { label: 'Branch Count', value: '12', change: '+1' },
];

export const overdueBorrowers = [
  { id: 'ORD-001', userName: 'John Smith', bookTitle: 'The Great Gatsby', daysOverdue: 5 },
  { id: 'ORD-002', userName: 'Sarah Johnson', bookTitle: '1984', daysOverdue: 3 },
  { id: 'ORD-003', userName: 'Mike Davis', bookTitle: 'To Kill a Mockingbird', daysOverdue: 8 },
  { id: 'ORD-004', userName: 'Emma Wilson', bookTitle: 'Pride and Prejudice', daysOverdue: 2 },
];

export const branchOverview = [
  { id: 'BR-001', name: 'Downtown Branch', location: 'Main Street', status: 'Active' },
  { id: 'BR-002', name: 'Uptown Branch', location: 'Park Avenue', status: 'Active' },
  { id: 'BR-003', name: 'Westside Branch', location: 'West Road', status: 'Inactive' },
  { id: 'BR-004', name: 'Eastside Branch', location: 'East Lane', status: 'Active' },
];

export const booksOverview = [
  { id: 'BK-001', name: 'The Great Gatsby', type: 'Fiction', language: 'English' },
  { id: 'BK-002', name: '1984', type: 'Dystopian', language: 'English' },
  { id: 'BK-003', name: 'To Kill a Mockingbird', type: 'Fiction', language: 'English' },
  { id: 'BK-004', name: 'Pride and Prejudice', type: 'Romance', language: 'English' },
];

export const usersOverview = [
  { id: 'US-001', name: 'John Smith', email: 'john@example.com', username: 'johnsmith' },
  { id: 'US-002', name: 'Sarah Johnson', email: 'sarah@example.com', username: 'sarahj' },
  { id: 'US-003', name: 'Mike Davis', email: 'mike@example.com', username: 'miked' },
  { id: 'US-004', name: 'Emma Wilson', email: 'emma@example.com', username: 'emmaw' },
];

export const branches = [
  { id: 'BR-001', name: 'Downtown Branch', location: 'Main Street', contact: '123-456-7890', manager: 'John Smith', status: 'Active', employees: 8 },
  { id: 'BR-002', name: 'Uptown Branch', location: 'Park Avenue', contact: '123-456-7891', manager: 'Sarah Johnson', status: 'Active', employees: 6 },
  { id: 'BR-003', name: 'Westside Branch', location: 'West Road', contact: '123-456-7892', manager: 'Mike Davis', status: 'Inactive', employees: 4 },
  { id: 'BR-004', name: 'Eastside Branch', location: 'East Lane', contact: '123-456-7893', manager: 'Emma Wilson', status: 'Active', employees: 5 },
  { id: 'BR-005', name: 'Riverside Branch', location: 'River Street', contact: '123-456-7894', manager: 'James Brown', status: 'Active', employees: 7 },
];

export const books = [
  { id: 'BK-001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', available: 5, borrowed: 3 },
  { id: 'BK-002', title: '1984', author: 'George Orwell', category: 'Dystopian', available: 2, borrowed: 6 },
  { id: 'BK-003', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', available: 4, borrowed: 2 },
  { id: 'BK-004', title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance', available: 6, borrowed: 1 },
  { id: 'BK-005', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', available: 3, borrowed: 4 },
  { id: 'BK-006', title: 'Brave New World', author: 'Aldous Huxley', category: 'Sci-Fi', available: 1, borrowed: 7 },
];

export const users = [
  { id: 'US-001', name: 'John Smith', email: 'john@example.com', role: 'Member', status: 'Active', joinDate: 'Jan 15, 2024' },
  { id: 'US-002', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Member', status: 'Active', joinDate: 'Feb 22, 2024' },
  { id: 'US-003', name: 'Mike Davis', email: 'mike@example.com', role: 'Librarian', status: 'Active', joinDate: 'Mar 10, 2024' },
  { id: 'US-004', name: 'Emma Wilson', email: 'emma@example.com', role: 'Member', status: 'Inactive', joinDate: 'Jan 05, 2024' },
  { id: 'US-005', name: 'James Brown', email: 'james@example.com', role: 'Admin', status: 'Active', joinDate: 'Dec 01, 2023' },
  { id: 'US-006', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Member', status: 'Active', joinDate: 'Apr 12, 2024' },
];

export const catalogs = [
  { id: 'CAT-001', title: 'Fiction Collection', description: 'All novels and fiction books', bookCount: 342, status: 'Active' },
  { id: 'CAT-002', title: 'Non-Fiction Reference', description: 'Educational and reference materials', bookCount: 215, status: 'Active' },
  { id: 'CAT-003', title: 'Academic Journals', description: 'Research papers and journals', bookCount: 127, status: 'Active' },
  { id: 'CAT-004', title: 'Children\'s Literature', description: 'Books for children and young adults', bookCount: 189, status: 'Active' },
  { id: 'CAT-005', title: 'History & Biography', description: 'Historical and biographical works', bookCount: 98, status: 'Inactive' },
];
