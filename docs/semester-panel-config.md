# Additional Info Panel Configuration Guide

The Additional Info Panel is a configurable component that appears on the enrollment page to provide important context and information about the current semester. This guide explains how to configure it through Firestore.

## 📍 Location in Database

The info panel configuration is stored in your Firestore database under:
```
semesters/{semesterId}/additionalInfoPanel
```

For example: `semesters/summer2025/additionalInfoPanel`

## 🎨 Visual Examples

### Basic Panel Structure
```
┌─────────────────────────────────────────────────────────┐
│ ☀️ Summer 2025 Program Information                     ▼ │  ← Header (clickable)
│ Important details about our summer camps, pricing...     │
└─────────────────────────────────────────────────────────┘
```

### Expanded Panel with Content
```
┌─────────────────────────────────────────────────────────┐
│ ☀️ Summer 2025 Program Information                     ▲ │
│ Important details about our summer camps, pricing...     │
├─────────────────────────────────────────────────────────┤
│ 🎁 Early Bird Special: Sign up before May 15...         │  ← Highlight Box
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │
│ │🕐 Schedule  │ │👥 Age Groups│ │📍 Locations │         │  ← Info Cards Grid
│ │• Half Day   │ │• Rising 2-5 │ │• MLA Campus │         │
│ │• Full Day   │ │• Rising 5-12│ │• Cooper's   │         │
│ └─────────────┘ └─────────────┘ └─────────────┘         │
│                                                         │
│ ┌─────────────┐ ┌─────────────┐                         │
│ │💰 Pricing   │ │📧 Need Help?│                         │
│ │[$125] [$225]│ │Email us at  │                         │
│ │Half   Full  │ │info@mtn...  │                         │
│ └─────────────┘ └─────────────┘                         │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Configuration Structure

### Root Level Properties

```json
{
  "additionalInfoPanel": {
    "title": "☀️ Summer 2025 Program Information",
    "subtitle": "Important details about our summer camps, pricing, and logistics",
    "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "isExpandedByDefault": false,
    "highlightBoxes": [...],
    "infoCards": [...]
  }
}
```

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `title` | string | Main heading text (supports emojis) | `"☀️ Summer 2025 Program Information"` |
| `subtitle` | string | Descriptive text below title | `"Important details about our summer camps..."` |
| `gradient` | string | CSS gradient for header background | `"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"` |
| `isExpandedByDefault` | boolean | Whether panel starts open or closed | `false` |

### Gradient Options
```css
/* Purple to Blue (Default) */
"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

/* Summer Orange */
"linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)"

/* Forest Green */
"linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"

/* Sunset */
"linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
```

## 🎯 Highlight Boxes

Highlight boxes appear at the top of the expanded content and draw attention to important information.

### Configuration
```json
"highlightBoxes": [
  {
    "type": "promotional",
    "text": "<strong>🎁 Early Bird Special:</strong> Sign up before May 15 for a FREE t-shirt!"
  },
  {
    "type": "warning",
    "text": "<strong>⚠️ Important:</strong> Registration closes Friday at 5pm"
  }
]
```

### Highlight Box Types

| Type | Visual Style | Best Used For |
|------|--------------|---------------|
| `promotional` | 🟠 Orange gradient | Special offers, discounts, free items |
| `info` | 🔵 Blue gradient | General information, announcements |
| `success` | 🟢 Green gradient | Confirmations, positive news |
| `warning` | 🟡 Yellow gradient | Deadlines, important notices |

### Visual Examples
```
🟠 Promotional: 🎁 Early Bird Special: Sign up before May 15...
🔵 Info:        ℹ️ New this year: Extended hours available...
🟢 Success:     ✅ Scholarships approved for all applicants!
🟡 Warning:     ⚠️ Registration closes Friday at 5pm
```

## 📋 Info Cards

Info cards are the main content blocks that organize information into digestible sections.

### Basic Card Structure
```json
{
  "title": "Schedule & Format",
  "icon": "🕐",
  "content": [...]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Card heading |
| `icon` | string | Emoji icon for the card |
| `content` | array | Array of content blocks (see below) |

### Content Types

#### 1. Text Content
```json
{
  "type": "text",
  "text": "Free lunch hour (12pm-1pm) provided when combining two half-day camps!"
}
```
**Result:** Regular paragraph text (supports HTML formatting)

#### 2. List Content  
```json
{
  "type": "list",
  "items": [
    "<strong>Traditional Workshops:</strong> 4 days, Monday-Thursday",
    "<strong>Half Day:</strong> 9am-12pm OR 1pm-4pm",
    "<strong>Full Day:</strong> 9am-4pm"
  ]
}
```
**Result:** 
- **Traditional Workshops:** 4 days, Monday-Thursday
- **Half Day:** 9am-12pm OR 1pm-4pm  
- **Full Day:** 9am-4pm

#### 3. Grid Content (for pricing, stats, etc.)
```json
{
  "type": "grid",
  "gridItems": [
    {
      "label": "Half-day workshops",
      "value": "$125+",
      "description": ""
    },
    {
      "label": "Full-day workshops", 
      "value": "$225+",
      "description": ""
    }
  ]
}
```
**Result:**
```
┌─────────┐ ┌─────────┐
│  $125+  │ │  $225+  │
│Half-day │ │Full-day │
│workshops│ │workshops│
└─────────┘ └─────────┘
```

## 📝 Complete Example Configuration

```json
{
  "additionalInfoPanel": {
    "title": "☀️ Summer 2025 Program Information",
    "subtitle": "Important details about our summer camps, pricing, and logistics",
    "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "isExpandedByDefault": false,
    "highlightBoxes": [
      {
        "type": "promotional",
        "text": "<strong>🎁 Early Bird Special:</strong> Sign up before May 15 for a FREE t-shirt ($20 value)!"
      },
      {
        "type": "warning",
        "text": "<strong>⚠️ Deadline:</strong> Registration closes June 1st"
      }
    ],
    "infoCards": [
      {
        "title": "Schedule & Format",
        "icon": "🕐",
        "content": [
          {
            "type": "list",
            "items": [
              "<strong>Traditional Workshops:</strong> 4 days, Monday-Thursday",
              "<strong>Half Day:</strong> 9am-12pm OR 1pm-4pm",
              "<strong>Full Day:</strong> 9am-4pm",
              "<strong>Extended Hours:</strong> +$25/week for 8am-9am or 4pm-5pm"
            ]
          },
          {
            "type": "text",
            "text": "Free lunch hour (12pm-1pm) provided when combining two half-day camps!"
          }
        ]
      },
      {
        "title": "Age Groups",
        "icon": "👥", 
        "content": [
          {
            "type": "list",
            "items": [
              "<strong>Younger Group:</strong> Rising 2nd-5th grade",
              "<strong>Older Group:</strong> Rising 5th-12th grade",
              "<strong>Minimum Age:</strong> 7 years old (insurance requirement)"
            ]
          },
          {
            "type": "text",
            "text": "5th graders can join either group based on maturity. Email us if your child is on the age boundary!"
          }
        ]
      },
      {
        "title": "Pricing",
        "icon": "💰",
        "content": [
          {
            "type": "grid",
            "gridItems": [
              {
                "label": "Half-day workshops",
                "value": "$125+"
              },
              {
                "label": "Full-day workshops",
                "value": "$225+"
              },
              {
                "label": "Two matched half-days",
                "value": "$225"
              },
              {
                "label": "4+ camps discount",
                "value": "10% off"
              }
            ]
          }
        ]
      },
      {
        "title": "Need Help?",
        "icon": "📧",
        "content": [
          {
            "type": "text",
            "text": "<strong>Questions about age groups or special needs?</strong><br>Email: info@mountainsol.org"
          },
          {
            "type": "text",
            "text": "<strong>View our calendar:</strong> See all dates and times on the Mountain SOL Calendar"
          }
        ]
      }
    ]
  }
}
```

## 🎨 Suggested Emoji Icons

| Category | Emojis |
|----------|--------|
| **Time/Schedule** | 🕐 ⏰ 📅 ⏱️ |
| **People/Ages** | 👥 👶 🧒 👦 👧 |
| **Location** | 📍 🏫 🏕️ 🌲 🏞️ |
| **Money** | 💰 💵 💳 🎟️ |
| **Communication** | 📧 📞 💬 📝 |
| **Activities** | 🎨 🏃 🧗 🚶 ⛺ |
| **Food/Safety** | 🥜 🍎 ⚠️ 🛡️ |
| **General** | ℹ️ ❓ 📋 📊 🎯 |

## 🚀 Quick Start Templates

### Minimal Configuration
```json
{
  "additionalInfoPanel": {
    "title": "📚 Fall 2025 Information",
    "subtitle": "Key details for the upcoming semester",
    "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "isExpandedByDefault": false,
    "highlightBoxes": [],
    "infoCards": [
      {
        "title": "Important Notes",
        "icon": "ℹ️",
        "content": [
          {
            "type": "text",
            "text": "Please review our updated policies before enrolling."
          }
        ]
      }
    ]
  }
}
```

### Remove Info Panel
To remove the info panel entirely, simply delete the `additionalInfoPanel` property or set it to `null`:
```json
{
  "additionalInfoPanel": null
}
```

## 🔍 Testing Your Configuration

1. **Save your changes** in Firestore
2. **Refresh the enrollment page** - changes appear immediately
3. **Check mobile view** - the panel is responsive
4. **Test expand/collapse** - click the header to toggle

## 💡 Best Practices

- **Keep titles concise** - they appear in the collapsed state
- **Use emojis sparingly** - 1-2 per card for visual interest
- **Organize by priority** - most important info in highlight boxes
- **Test on mobile** - ensure text is readable on small screens
- **Update seasonally** - different semesters need different information