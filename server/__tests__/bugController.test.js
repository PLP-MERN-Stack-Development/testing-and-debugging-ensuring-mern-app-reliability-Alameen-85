const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');
const Bug = require('../models/Bug');

let mongoServer;

// Setup: Connect to in-memory MongoDB before tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

// Cleanup: Clear database after each test
afterEach(async () => {
    await Bug.deleteMany({});
});

// Teardown: Disconnect and stop MongoDB after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Bug API Endpoints', () => {
    describe('POST /api/bugs', () => {
        it('should create a new bug', async () => {
            const newBug = {
                title: 'Test Bug',
                description: 'This is a test bug description'
            };

            const response = await request(app)
                .post('/api/bugs')
                .send(newBug)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body.title).toBe(newBug.title);
            expect(response.body.description).toBe(newBug.description);
            expect(response.body.status).toBe('open');
        });

        it('should return 400 if title is missing', async () => {
            const invalidBug = {
                description: 'Missing title'
            };

            const response = await request(app)
                .post('/api/bugs')
                .send(invalidBug)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });

        it('should return 400 if description is missing', async () => {
            const invalidBug = {
                title: 'Missing description'
            };

            const response = await request(app)
                .post('/api/bugs')
                .send(invalidBug)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /api/bugs', () => {
        it('should return all bugs', async () => {
            // Create test bugs
            await Bug.create([
                { title: 'Bug 1', description: 'Description 1' },
                { title: 'Bug 2', description: 'Description 2' }
            ]);

            const response = await request(app)
                .get('/api/bugs')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
        });

        it('should return empty array when no bugs exist', async () => {
            const response = await request(app)
                .get('/api/bugs')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

    describe('PUT /api/bugs/:id', () => {
        it('should update a bug by ID', async () => {
            const bug = await Bug.create({
                title: 'Original Title',
                description: 'Original Description'
            });

            const updateData = {
                title: 'Updated Title',
                status: 'in-progress'
            };

            const response = await request(app)
                .put(`/api/bugs/${bug._id}`)
                .send(updateData)
                .expect(200);

            expect(response.body.title).toBe('Updated Title');
            expect(response.body.status).toBe('in-progress');
        });

        it('should return 404 for non-existent bug', async () => {
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .put(`/api/bugs/${fakeId}`)
                .send({ title: 'Updated' })
                .expect(404);

            expect(response.body.message).toBe('Bug not found');
        });
    });

    describe('DELETE /api/bugs/:id', () => {
        it('should delete a bug by ID', async () => {
            const bug = await Bug.create({
                title: 'Bug to Delete',
                description: 'Will be deleted'
            });

            const response = await request(app)
                .delete(`/api/bugs/${bug._id}`)
                .expect(200);

            expect(response.body.message).toBe('Bug deleted successfully');

            // Verify bug is actually deleted
            const deletedBug = await Bug.findById(bug._id);
            expect(deletedBug).toBeNull();
        });

        it('should return 404 when deleting non-existent bug', async () => {
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .delete(`/api/bugs/${fakeId}`)
                .expect(404);

            expect(response.body.message).toBe('Bug not found');
        });
    });
});