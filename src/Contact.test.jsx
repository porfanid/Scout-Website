import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from './Contact';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './config/themes/dark';

jest.mock('./firebase.js', () => ({
    functions: {
        httpsCallable: jest.fn(() => jest.fn(() => Promise.resolve({
            data: { success: true },
        }))),
    },
    getAuth: jest.fn(() => ({
        currentUser: null, // Mock the user as not logged in
    })),
    getFirestore: jest.fn(),
    getAnalytics: jest.fn(),
    initializeApp: jest.fn()
}));

describe('Contact Component', () => {
    test('renders the contact form', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider theme={darkTheme}>
                    <Contact />
                </ThemeProvider>
            </I18nextProvider>
        );

        expect(screen.getByLabelText(/Όνομα/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Μήνυμα/i)).toBeInTheDocument();
        expect(screen.getByText(/Αποστολή Μηνύματος/i)).toBeInTheDocument();
    });

    test('submits the form successfully', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider theme={darkTheme}>
                    <Contact />
                </ThemeProvider>
            </I18nextProvider>
        );

        fireEvent.change(screen.getByLabelText(/Όνομα/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Μήνυμα/i), { target: { value: 'Hello, this is a test message.' } });

        fireEvent.click(screen.getByText(/Αποστολή Μηνύματος/i));

        expect(await screen.findByText(/Το μήνυμα στάλθηκε με επιτυχία!/i)).toBeInTheDocument();
    });

    test('shows error when fields are empty', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider theme={darkTheme}>
                    <Contact />
                </ThemeProvider>
            </I18nextProvider>
        );

        fireEvent.click(screen.getByText(/Αποστολή Μηνύματος/i));

        expect(screen.getByText(/Όλα τα πεδία είναι υποχρεωτικά/i)).toBeInTheDocument();
    });
});