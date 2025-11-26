import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BugForm from '../BugForm';

describe('BugForm Component', () => {
    it('renders all form fields', () => {
        render(<BugForm onSubmit={vi.fn()} />);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/reported by/i)).toBeInTheDocument();
    });

    it('displays initial data when provided', () => {
        const initialData = {
            title: 'Test Bug',
            description: 'Test Description',
            priority: 'high',
            reportedBy: 'John Doe'
        };

        render(<BugForm onSubmit={vi.fn()} initialData={initialData} />);

        expect(screen.getByDisplayValue('Test Bug')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /priority/i })).toHaveValue('high');
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    it('calls onSubmit with form data when submitted', async () => {
        const mockSubmit = vi.fn();
        const user = userEvent.setup();

        render(<BugForm onSubmit={mockSubmit} />);

        // Fill out the form
        await user.type(screen.getByLabelText(/title/i), 'New Bug');
        await user.type(screen.getByLabelText(/description/i), 'This is a test bug description');
        await user.selectOptions(screen.getByLabelText(/priority/i), 'critical');
        await user.type(screen.getByLabelText(/reported by/i), 'Jane Smith');

        // Submit the form
        await user.click(screen.getByRole('button', { name: /submit/i }));

        // Check if onSubmit was called with correct data
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            title: 'New Bug',
            description: 'This is a test bug description',
            priority: 'critical',
            reportedBy: 'Jane Smith'
        });
    });

    it('calls onCancel when cancel button is clicked', async () => {
        const mockCancel = vi.fn();
        const user = userEvent.setup();

        render(<BugForm onSubmit={vi.fn()} onCancel={mockCancel} />);

        await user.click(screen.getByRole('button', { name: /cancel/i }));

        expect(mockCancel).toHaveBeenCalledTimes(1);
    });

    it('does not render cancel button when onCancel is not provided', () => {
        render(<BugForm onSubmit={vi.fn()} />);

        expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
    });

    it('updates form fields when user types', async () => {
        const user = userEvent.setup();

        render(<BugForm onSubmit={vi.fn()} />);

        const titleInput = screen.getByLabelText(/title/i);
        await user.type(titleInput, 'Test');

        expect(titleInput).toHaveValue('Test');
    });
});