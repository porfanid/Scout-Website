import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LightboxGallery from './LightboxGallery';
import axios from 'axios';

jest.mock('axios');
jest.mock('yet-another-react-lightbox', () => ({ open, close, slides, index, carousel, render }) => (
        <div>
            {slides.map((slide, i) => (
                    <img key={i} src={slide.src} alt={slide.alt} />
            ))}
        </div>
));

describe('LightboxGallery', () => {
    const mockOnClose = jest.fn();

    it('renders the lightbox with images', async () => {
        axios.get.mockResolvedValue({
            data: {
                1: 'https://example.com/images.jpg',
            },
        });

        render(<LightboxGallery folderId="test-folder" onClose={mockOnClose} />);

        expect(await screen.findByAltText('images.jpg')).toBeInTheDocument();
    });


    it('handles errors when fetching images', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        render(<LightboxGallery folderId="test-folder" onClose={mockOnClose} />);

        expect(await screen.findByText(/Error fetching images: Network Error/)).toBeInTheDocument();
    });
});