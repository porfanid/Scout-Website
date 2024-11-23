import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Departments from './Departments';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

jest.mock('../firebase', () => ({
    db: {
        collection: jest.fn(),
    },
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    onSnapshot: jest.fn(),
}));

const mockDepartments = [
    {
        name: 'Λυκόπουλα',
        moto: "Πάντα πρόθυμος για το καλό!",
        img_url: "/CMS/site/images/participate-1.png",
        overlay_img_url: 'lykopoyla.png',
        age: "7-11",
        bgColor: "#B8860B",
    },
    {
        name: 'Πρόσκοποι',
        moto: "Έσο έτοιμος!",
        img_url: "/CMS/site/images/participate-2.png",
        overlay_img_url: 'proskopoi.png',
        age: "11-15",
        bgColor: "#008000",
    },
    {
        name: 'Ανιχνευτές',
        moto: "Ανίχνευε Υψηλότερα και Ευρύτερα!",
        img_url: "/CMS/site/images/participate-3.png",
        overlay_img_url: 'anixneytes.png',
        age: "15-18",
        bgColor: "#00008B",
    },
    {
        name: 'Προσκοπικό Δίκτυο',
        moto: "Εμείς μαζί με Άλλους!",
        img_url: "/CMS/site/images/participate-4.png",
        overlay_img_url: 'diktyo.png',
        age: "18-24",
        bgColor: "#003C5B",
    },
    {
        name: 'Εθελοντές',
        img_url: "/CMS/site/images/participate-5.png",
        age: "",
        bgColor: "#4B2C6D",
    },
    {
        name: 'Γονείς και Κηδεμόνες',
        img_url: "/CMS/site/images/participate-6.png",
        age: "",
        bgColor: "#C75B00",
    }
];

describe('Departments Component', () => {
    beforeEach(() => {
        onSnapshot.mockImplementation((query, callback) => {
            callback({
                docs: mockDepartments.map((dept) => ({
                    id: dept.name,
                    data: () => dept,
                })),
            });
            return jest.fn();
        });
    });

    it('renders departments correctly', () => {
        const theme = createTheme();

        render(
            <ThemeProvider theme={theme}>
                <Departments />
            </ThemeProvider>
        );

        mockDepartments.forEach((dept) => {
            expect(screen.getByText(dept.name)).toBeInTheDocument();
            if(dept.moto) {
                expect(screen.getByText(dept.moto)).toBeInTheDocument();
            }
            if (dept.age) {
                expect(screen.getByText(`${dept.age} χρονών`)).toBeInTheDocument();
            }
        });
    });
});