import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BugList from '../BugList';

describe('BugList Component', () => {
    const mockBugs = [
        {
            _id: '1',
            title: 'Test Bug 1',
            description: 'Description for bug 1',
            priority: 'high',
            status: 'open',
            reportedBy: 'John Doe'
        },
        {
            _id: '2',
            title: 'Test Bug 2',
            description: 'Description for bug 2',
            priority: 'medium',
            status: 'in-progress',
            reportedBy: 'Jane Smith'
        }
    ];

    it('displays empty message when no bugs are provided', () => {
        render(
            <BugList
                bugs={[]}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
    });

    it('renders all bugs when provided', () => {
        render(
            <BugList
                bugs={mockBugs}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        expect(screen.getByText('Test Bug 1')).toBeInTheDocument();
        expect(screen.getByText('Test Bug 2')).toBeInTheDocument();
        expect(screen.getByText('Description for bug 1')).toBeInTheDocument();
        expect(screen.getByText('Description for bug 2')).toBeInTheDocument();
    });

    it('displays bug priority and status', () => {
        render(
            <BugList
                bugs={mockBugs}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        expect(screen.getByText('high')).toBeInTheDocument();
        expect(screen.getByText('medium')).toBeInTheDocument();
        expect(screen.getByText('open')).toBeInTheDocument();
        expect(screen.getByText('in-progress')).toBeInTheDocument();
    });

    it('displays reporter name', () => {
        render(
            <BugList
                bugs={mockBugs}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', async () => {
        const mockEdit = vi.fn();
        const user = userEvent.setup();

        render(
            <BugList
                bugs={mockBugs}
                onEdit={mockEdit}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        await user.click(editButtons[0]);

        expect(mockEdit).toHaveBeenCalledTimes(1);
        expect(mockEdit).toHaveBeenCalledWith(mockBugs[0]);
    });

    it('calls onDelete when delete button is clicked', async () => {
        const mockDelete = vi.fn();
        const user = userEvent.setup();

        render(
            <BugList
                bugs={mockBugs}
                onEdit={vi.fn()}
                onDelete={mockDelete}
                onStatusChange={vi.fn()}
            />
        );

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        await user.click(deleteButtons[0]);

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith('1');
    });

    it('calls onStatusChange when status dropdown is changed', async () => {
        const mockStatusChange = vi.fn();
        const user = userEvent.setup();

        render(
            <BugList
                bugs={mockBugs}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={mockStatusChange}
            />
        );

        const statusDropdowns = screen.getAllByRole('combobox');
        await user.selectOptions(statusDropdowns[0], 'resolved');

        expect(mockStatusChange).toHaveBeenCalledTimes(1);
        expect(mockStatusChange).toHaveBeenCalledWith('1', 'resolved');
    });

    it('applies correct CSS classes for priority colors', () => {
        const bugWithCriticalPriority = [{
            ...mockBugs[0],
            priority: 'critical'
        }];

        const { container } = render(
            <BugList
                bugs={bugWithCriticalPriority}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        const priorityBadge = screen.getByText('critical');
        expect(priorityBadge).toHaveClass('bg-red-200', 'text-red-800');
    });

    it('applies correct CSS classes for status colors', () => {
        const bugWithResolvedStatus = [{
            ...mockBugs[0],
            status: 'resolved'
        }];

        render(
            <BugList
                bugs={bugWithResolvedStatus}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        const statusBadge = screen.getByText('resolved');
        expect(statusBadge).toHaveClass('bg-green-200', 'text-green-800');
    });

    it('renders correct number of bugs', () => {
        render(
            <BugList
                bugs={mockBugs}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onStatusChange={vi.fn()}
            />
        );

        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        expect(editButtons).toHaveLength(2);
    });
});