# Deployment Guide - Yonder Trading Website

This guide walks you through deploying your website to GitHub Pages with Cloudflare DNS and SSL.

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository details:
   - **Repository name**: `yondertrading.com` (or any name you prefer)
   - **Description**: "Official website for Yonder Trading LLC - Veteran-owned Amazon FBA wholesale partner"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README (we already have one)

3. Click "Create repository"

## Step 2: Push Code to GitHub

From your local terminal (already in `/Users/ajunk/Workspace/GitHub/yondertrading.com`):

```bash
# Add the GitHub repository as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/yondertrading.com.git

# Push code to GitHub
git push -u origin main
```

If you use SSH instead of HTTPS:
```bash
git remote add origin git@github.com:USERNAME/yondertrading.com.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

GitHub will build your site. After 1-2 minutes, you'll see:
```
Your site is live at https://USERNAME.github.io/yondertrading.com/
```

## Step 4: Configure Custom Domain in GitHub

Still in Settings > Pages:

1. Under "Custom domain", enter: `yondertrading.com`
2. Click **Save**
3. Wait for DNS check to complete
4. Once DNS check passes, check **Enforce HTTPS**

Note: The DNS check will fail initially until you configure Cloudflare (next step).

## Step 5: Configure Cloudflare DNS

### Option A: Using Cloudflare as Full DNS (Recommended)

1. Log into https://dash.cloudflare.com/
2. Select your domain: **yondertrading.com**
3. Go to **DNS** > **Records**
4. Delete any existing A or CNAME records for `@` and `www` (if present)

5. Add these **A records** for the apex domain:
   ```
   Type: A
   Name: @
   IPv4 address: 185.199.108.153
   Proxy status: Proxied (orange cloud icon)
   TTL: Auto
   ```

   Repeat for these additional IPs:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

6. Add **CNAME record** for www subdomain:
   ```
   Type: CNAME
   Name: www
   Target: USERNAME.github.io (replace USERNAME)
   Proxy status: Proxied (orange cloud icon)
   TTL: Auto
   ```

7. Your DNS records should look like this:
   ```
   A     @    185.199.108.153    Proxied
   A     @    185.199.109.153    Proxied
   A     @    185.199.110.153    Proxied
   A     @    185.199.111.153    Proxied
   CNAME www  USERNAME.github.io Proxied
   ```

### Option B: Using Cloudflare as CDN Only

If you want to keep DNS elsewhere:

1. Add CNAME record at your DNS provider:
   ```
   Type: CNAME
   Name: @
   Target: USERNAME.github.io
   ```

2. In Cloudflare, add the domain and enable proxy

## Step 6: Configure Cloudflare SSL/TLS

1. In Cloudflare dashboard, go to **SSL/TLS**
2. Set encryption mode to **Full** (not "Full (strict)")
   - This is important for GitHub Pages compatibility
3. Enable these settings:
   - Always Use HTTPS: **On**
   - Automatic HTTPS Rewrites: **On**
   - Minimum TLS Version: **1.2** or higher

## Step 7: Verify Deployment

1. Wait 5-10 minutes for DNS propagation
2. Visit https://yondertrading.com in a browser
3. Verify:
   - ✓ Site loads correctly
   - ✓ HTTPS works (padlock icon in browser)
   - ✓ All sections display properly
   - ✓ Forms work (check console for validation)

## Step 8: Configure yondertrading.online (Optional)

For A/B testing later, repeat the Cloudflare DNS steps for `yondertrading.online`:

1. Add the same A records
2. Add CNAME for www
3. Configure SSL/TLS the same way

Both domains will point to the same GitHub Pages deployment.

## Troubleshooting

### "DNS check failed" in GitHub Pages
- Wait 10-15 minutes after adding DNS records
- Verify A records point to correct GitHub IPs
- Ensure Cloudflare proxy is enabled (orange cloud)

### "Too many redirects" error
- Change Cloudflare SSL/TLS mode from "Flexible" to "Full"
- Clear browser cache and cookies

### 404 errors
- Ensure CNAME file contains `yondertrading.com`
- Verify GitHub Pages is enabled for main branch
- Check that index.html is in root directory

### HTTPS certificate errors
- Wait up to 24 hours for GitHub to provision certificate
- Ensure "Enforce HTTPS" is checked in GitHub Pages settings
- Verify Cloudflare SSL is set to "Full" mode

### Contact form not working
- Form currently logs to console only
- See README.md for form backend setup options
- Check browser console for validation errors

## Next Steps

1. **Configure Form Backend**: Choose and set up a form service (Formspree, Web3Forms, etc.)
2. **Add Analytics**: Consider Google Analytics, Plausible, or Cloudflare Analytics
3. **Test on Mobile**: Verify responsive design on actual devices
4. **SEO Optimization**: Add meta tags, sitemap, robots.txt
5. **Performance**: Monitor with Lighthouse and PageSpeed Insights

## Email Hosting Options (Cheap)

Since you mentioned working on email hosting, here are budget-friendly options:

1. **Cloudflare Email Routing** (FREE)
   - Free email forwarding for your domain
   - Forward hello@yondertrading.com → your Gmail
   - Cannot send from domain without third-party SMTP

2. **Zoho Mail** (Free tier available)
   - Free plan: 5GB storage, 1 domain, 5 users
   - Can send/receive from your domain
   - Web interface and mobile apps

3. **ImprovMX** (FREE)
   - Free email forwarding
   - Premium: $9/month for sending

4. **Migadu** ($19/year)
   - Unlimited domains and addresses
   - Full IMAP/SMTP access
   - Great for small businesses

5. **ProtonMail** (Custom domain: $4.99/month)
   - Privacy-focused
   - Professional features
   - Custom domain support

## Support

If you encounter issues, check:
- GitHub Pages documentation: https://docs.github.com/pages
- Cloudflare support: https://support.cloudflare.com/
- Repository README.md for detailed information

---

**Ready to deploy!** Follow the steps above in order, and your site will be live within 30 minutes.
