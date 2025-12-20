# Yonder Trading LLC - Official Website

Professional website for Yonder Trading LLC, a veteran-owned Amazon FBA wholesale partnership company based in Iowa.

## Overview

This is a single-page responsive website designed to establish credibility and attract potential business partners for wholesale Amazon FBA operations.

## Features

- Modern, professional design
- Fully responsive (mobile, tablet, desktop)
- Smooth scrolling navigation
- Contact form for partnership inquiries
- Veteran-owned business badge
- Optimized for GitHub Pages hosting

## Sections

1. **Hero** - Main value proposition and call-to-action
2. **About** - Company background, veteran-owned status, core values
3. **Services** - How the FBA partnership model works
4. **Contact** - Partnership inquiry form and company details

## Technology Stack

- HTML5
- CSS3 (Custom, no frameworks)
- Vanilla JavaScript
- GitHub Pages (hosting)
- Cloudflare (DNS and SSL)

## Local Development

To view the site locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx http-server
   ```
4. Visit `http://localhost:8000`

## Deployment

### GitHub Pages Setup

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Click Save
6. Site will be available at `https://[username].github.io/[repository-name]`

### Cloudflare DNS Configuration

1. Log into Cloudflare dashboard
2. Select your domain (yondertrading.com)
3. Go to DNS > Records
4. Add the following CNAME record:
   - Type: `CNAME`
   - Name: `@` (or `www` for www subdomain)
   - Target: `[username].github.io`
   - Proxy status: Proxied (orange cloud)
   - TTL: Auto

5. For apex domain support, add these A records:
   ```
   Type: A, Name: @, IPv4: 185.199.108.153
   Type: A, Name: @, IPv4: 185.199.109.153
   Type: A, Name: @, IPv4: 185.199.110.153
   Type: A, Name: @, IPv4: 185.199.111.153
   ```

6. In GitHub repository settings:
   - Go to Settings > Pages
   - Under "Custom domain", enter: `yondertrading.com`
   - Check "Enforce HTTPS"

## Contact Form Configuration

The contact form currently logs submissions to the console. To enable email delivery, integrate with one of these services:

### Option 1: Formspree (Recommended)
1. Sign up at https://formspree.io/
2. Create a new form
3. Update `script.js` line ~60 with your form endpoint:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   });
   ```

### Option 2: Web3Forms
1. Get API key from https://web3forms.com/
2. Update `script.js` with your access key
3. Uncomment the Web3Forms section

### Option 3: EmailJS
1. Sign up at https://www.emailjs.com/
2. Configure email service
3. Use their JavaScript SDK

### Option 4: Custom Backend
Create your own API endpoint and update the fetch URL in `script.js`

## Domain Configuration

- **Primary Domain**: yondertrading.com
- **Secondary Domain**: yondertrading.online (for future A/B testing)

Both domains should point to the same GitHub Pages deployment via Cloudflare.

## File Structure

```
yondertrading.com/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── script.js           # Form handling and interactions
└── README.md           # This file
```

## Customization

### Colors
Primary colors are defined in `styles.css` CSS variables:
- Primary: `#2563eb` (blue)
- Secondary: `#0891b2` (cyan)
- Accent: `#059669` (green)

### Content
Edit `index.html` to update:
- Company information
- Service descriptions
- Contact details
- Section content

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2025 Yonder Trading LLC. All rights reserved.

## Contact

For questions about this website or partnership opportunities, use the contact form at yondertrading.com
