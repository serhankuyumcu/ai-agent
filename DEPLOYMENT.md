# AI-Agent Website

## Netlify Deployment Instructions

### Current Status
- **Netlify URL**: https://cozy-pie-f6e9eb.netlify.app/
- **GitHub Repo**: https://github.com/serhankuyumcu/ai-agent

### Build Settings

In Netlify Dashboard, set these:

1. **Build command**: Leave EMPTY (this is a static site)
2. **Publish directory**: `.` (just a dot)
3. **Base directory**: Leave EMPTY

### Manual Deploy Test

If automatic deployment isn't working:

1. Go to Netlify Dashboard
2. Click "Deploys" tab
3. Look for deploy status - is it successful or failed?
4. If failed, check the deploy logs for errors
5. Try manual deploy: "Trigger deploy" > "Deploy site"

### Common Issues

❌ **Large files**: The `.mov` video files are 15MB+, might cause issues
   - Solution: Already removed from HTML

❌ **Missing files**: Check all referenced files exist
   - CSS: ✅ All present
   - JS: ✅ main.js exists
   - Images: ✅ All present (including new logo.png)

❌ **Case sensitivity**: Filenames must match exactly
   - Solution: All lowercase already

### Testing

Once deployed, test these URLs:
- https://cozy-pie-f6e9eb.netlify.app/test.html (simple test page)
- https://cozy-pie-f6e9eb.netlify.app/ (main page)

### Next Steps

1. Check Netlify deploy logs
2. Verify build settings in dashboard
3. Try manual deploy if automatic failed
4. Share any error messages from Netlify logs
