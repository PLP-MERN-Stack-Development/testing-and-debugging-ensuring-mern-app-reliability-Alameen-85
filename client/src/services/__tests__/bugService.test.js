import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bugService } from '../bugService';

// Mock fetch globally
global.fetch = vi.fn();

describe('bugService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllBugs', () => {
        it('fetches all bugs successfully', async () => {
            const mockBugs = [
                { _id: '1', title: 'Bug 1' }
            ];

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockBugs })
            });

            const result = await bugService.getAllBugs();

            expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/bugs');
            expect(result.data).toEqual(mockBugs);
        });
    });

    describe('createBug', () => {
        it('creates a new bug successfully', async () => {
            const newBug = {
                title: 'New Bug',
                description: 'Test description'
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: newBug })
            });

            const result = await bugService.createBug(newBug);

            expect(result.data).toEqual(newBug);
        });
    });
});