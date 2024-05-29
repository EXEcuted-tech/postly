const { getAllNotifications } = require('../controllers/notifController');
const db = require('../controllers/a_db');

jest.mock('../controllers/a_db');

describe('Get all notifications function', () => {
  test('Should return all notifications for a given user ID', async () => {
    const req = { query: { userID: 'user123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockRows = [{ id: 1, message: 'Notification 1' }, { id: 2, message: 'Notification 2' }];
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockRows);
    });

    await getAllNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      notif: mockRows,
    });
  });

  test('Should handle database error', async () => {
    const req = { query: { userID: 'user123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    db.query.mockImplementation((query, params, callback) => {
      callback(new Error('Database error'));
    });

    await getAllNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      success: false,
      error: 'Error retrieving all records',
    });
  });
});