# Design Document

## Overview

This design outlines the implementation approach for adding German language support to the Pablo Coffee Go application. The solution leverages the existing internationalization infrastructure using Meteor's universe:i18n package and follows the established patterns for multi-language support.

## Architecture

The German language support will be integrated into the existing i18n architecture:

```
Client Side:
├── translations/de-DE.i18n.json (New German translation file)
├── client/ui/providers/i18n.tsx (No changes needed)
├── client/ui/components/languageSelector/ (Minor updates)
└── settings.json (Configuration update)

Server Side:
├── settings.json (Add German to supportedLanguages)
└── public/online/images/flags/de-DE.svg (Already exists)
```

## Components and Interfaces

### Translation File Structure
The German translation file (`translations/de-DE.i18n.json`) will follow the same structure as existing translation files:

```json
{
  "_locale": "de-DE",
  "Language": "Sprache",
  "Login": "Anmelden",
  // ... all other translations
}
```

### Language Selector Component
The existing `LanguageSelector.jsx` component will automatically support German once it's added to the configuration. No code changes are required as it dynamically reads from `supportedLanguages` configuration.

### Settings Configuration
The `settings.json` file will be updated to include German in the `supportedLanguages` array:

```json
{
  "public": {
    "app": {
      "supportedLanguages": [
        {
          "languageCode": "tr-TR",
          "languageLabel": "Türkçe"
        },
        {
          "languageCode": "en-US",
          "languageLabel": "English"
        },
        {
          "languageCode": "de-DE",
          "languageLabel": "Deutsch"
        }
      ]
    }
  }
}
```

## Data Models

### Translation Key Structure
All translation keys will maintain consistency with existing patterns:

- **Navigation**: "Homepage", "Dashboard", "Prices", etc.
- **Authentication**: "Login", "Register", "Password", etc.
- **Forms**: "Name", "Email address", "Phone number", etc.
- **Actions**: "Save", "Cancel", "Submit", "Delete", etc.
- **Messages**: Error messages, success messages, validation messages
- **Business Logic**: Coffee-specific terms, wallet features, scratch card text

### Locale Detection
The application will detect German locale through:
1. User's explicit language selection
2. Browser language preference (`navigator.language`)
3. Stored user preference in localStorage