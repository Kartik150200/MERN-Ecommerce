import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
    <Container>
        <footer className='footer-container'>
            <div className='footer-icons'>
                <Link
                    to='https://www.github.com'
                    aria-label='github account'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <GitHubIcon />
                </Link>
                <Link
                    to='https://www.linkedin.com'
                    aria-label='linkedin account'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <LinkedInIcon />
                </Link>
                <Link
                    to='https://www.twitter.com'
                    aria-label='twitter account'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <TwitterIcon />
                </Link>
            </div>
            <div className='footer-copyright'><CopyrightIcon />2023 Kosells</div>
        </footer>
    </Container>
  )
}

export default Footer