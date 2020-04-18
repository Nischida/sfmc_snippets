**Trendline Interactive - Multilingual Content Management System Setup**
 This document serves as a guide to setting up a multi-language content management effort in SFMC.

## Assets accounted for:
[F]    = Folder  
[A-CS] = AMPScript Code Snippet
[DE]   = Data Extension

```
Content Builder
  * [F] INT_Assets
    * [A-CS] INT_EmailControl
    * [A-CS] INT_AMPScript_Core_PKG
    * [A-CS] INT_AMPScript_Footer_PKG
  * [F] Dev Assets
    * [A-CS] INT_Dictionary_DEV
    * [A-CS] INT_ContentLookup_DEV
  * [F] PROD Assets
    * [A-CS] INT_Dictionary_PROD
    * [A-CS] INT_ContentLookup_PROD
```

```
Data Extensions
  * [F] Content Data Extensions
    * [F] Customer Stream
       * [F] Production Content
          * [DE] NAME_ROM_PROD
          * [DE] NAME_SYM_PROD
       * [F] Staging Content
          * [DE] NAME_ROM_STG
          * [DE] NAME_SYM_STG
  * [F] Supporting Data Extensions
    * [F] Catalog
       * [DE] INT_EmailCatalog
       * [DE] INT_AMPScriptCatalog
    * [F] Dictionary
       * [DE] INT_Dictionary
    * [F] Send Limiting
       * [DE] INT_EmailSendLimiting
       * [DE] INT_GlobalSendLimiting
  * [F] Logs
    * [DE] INT_ErrorLog
    * [DE] INT_NoLang_ErrorLog
    * [DE] INT_SendLimitingLog
    * [DE] INT_SendLog
```

## Code Snippet Manifest
---
### INT_EmailControl
INT_EmailControl uses AMPScript to lookup the content block ID for the INT_AMPScript_Core_PKG. 

It also set variables to control the email name used in the content/email catalog data extensions, where the content is pulled from (staging or production), as well as which versions of the INT_ContentLookup and INT_Dictionary (development or production) are used.

This is the only content block that should **not** be set as a `reference block` or called in by the `%%=ContentBlockById('')=%%` as it is unique to each email.


### INT_AMPScript_Core_PKG
INT_AMPScript_Core_PKG is responsible for looking up the content block IDs for the development and production versions of INT_ContentLookup and INT_Dictionary. In addition, it uses the values set in the INT_EmailControl AMPScript block to determine if the development or production versions should be used in rendering the email.


### INT_AMPScript_Footer_PKG
INT_AMPScript_Footer_PKG is an optional addition to the email templates. Most email programs will have global footers that are used for every email. In order to make that dynamic/translateable, it can be treated in the same way the email content is. It can also be set up for development and production versions. The AMPScript_Footer_PKG is the same as the Core_PKG; it toggles the footers based on the INT_EmailControl.


### INT_ContentLookup_PROD/DEV
INT_ContentLookup is the content block that is responsible for identifying the subscribers language, identifying the correct set of content data extensions to look for content in, and setting the content variables used in the emails. On initial run, there are four (4) content sections generated; if additional sections are needed for the DEs they will need to be added here.


### INT_Dictionary_PROD/DEV
INT_Dictionary allows standard information such as phone numbers, phrases, links/domains, etc to change based on supported languages. When a new Phrase is added to the data extension, it must be added here as well.


## Data Extension Manifest
---
### Content Data Extensions
All content is stored in customer stream/journey data extensions. Each set has Staging (testing) and Production (live) extensions and are split out into Roman Alphabet and Symbol Alphabet.

### INT_EmailCatalog
INT_EmailCatalog is what makes this system fully dynamic. This serves as a library of what emails/languages have content that can be used in emails and what data extensions to pull that content from. Each record needs to have an email name, language, staging DE name, production DE name.

Each supported language gets it's own record.

### INT_AMPScriptCatalog
INT_AMPScriptCatalog is created on the initial run and stores the AssetName and ID of all generated Code Snippets. These values are used to set the `%%=ContentBlockById(@var)=%%` AMPScript in various content blocks.

### INT_EmailSendLimiting
INT_EmailSendLimiting allows for specific emails to be held from sending by setting the email/language to hold, the start/end dates, or setting ongoing to `true`. Emails that are held are logged in the INT_SendLimitingLog.

### INT_GlobalSendLimiting
INT_GlobalSendLimiting allows for an all email hold based on language. This can be controlled by setting the start/end dates, or setting ongoing to `true`. Emails that are held are logged in the INT_SendLimitingLog.

### INT_ErrorLog
INT_ErrorLog is a record of all recorded errors pertaining to missing dependencies.

### INT_NoLang_ErrorLog
INT_NoLang_ErrorLog is a specific error logging DE for records where a language cannot be found.

### INT_SendLimitingLog
INT_SendLimitingLog serves as a log for all records that would have been deployed an email but qualified for the send limiting to stop that send. This allows the end user to identify users and re-deploy those emails after the hold is lifted if desired.

### INT_SendLog
INT_Send log is a dedicated sendlog for all emails that are deployed using this CMS. 
