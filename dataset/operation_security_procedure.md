# Operations Security Procedure v1.0

## Operations Security Procedure  
**Information Security Management System**

**Version:** 1.0  

---

## DOCUMENTATION CONTROL SHEET

### Document Description

| Field | Details |
|------|--------|
| Document Ref | YB/ISMS/PR/OSP |
| Document Name | Operations Security Procedure |
| Document Owner | YOTTABYTE |
| Document Classification | ☐ Public ☒ Confidential ☐ Internal ☐ Restricted |
| Document Status | ☐ Draft ☒ Issued ☐ Revision ☐ Obsolete |
| Publish Date | 17th Oct, 2023 |
| Next Review Date | 18th Oct, 2024 |
| Target Audience | YOTTABYTE |
| Distribution | SharePoint Site |

---

## Document Control

### Change Record

| Author | Version | Date | Change Reference |
|--------|--------|------|------------------|
| Abu Bakar / Manahil Ahmed Khan | 1.0 | 11th Oct, 2023 | Initial Draft |

### Reviewers

| Reviewer | Version | Date | Change Reference |
|----------|--------|------|------------------|
| Abu Bakar | 1.0 | 11th Oct, 2023 | Reviewed & Finalized |

### Approvers

| Approver | Version | Date | Change Reference |
|----------|--------|------|------------------|
| CEO - Harris Shamsi | 1.0 | 17th Oct, 2023 | Approved |

---

## TABLE OF CONTENTS

1. Backup and Recovery  
2. Log Monitoring Procedure  
3. End User Security Procedure  
4. IT Equipment Disposal Procedure  
5. Technical Vulnerability Management Procedure  
6. Annual Review  
7. Related References  

---

## 1. Backup and Recovery

### 1.1 Purpose
Defines methodology for backup and restoration of data.

### 1.2 Responsibility
- YOTTABYTE Management  
- Digital Operations Lead  
- Department Lead  

### 1.3 Procedure Statements

1. Backup all company data (restricted, confidential, internal) on OneDrive.  
2. Laptops must be configured with OneDrive.  
3. Change request required for SharePoint backups:  
   - Ticket created → Approved → Access granted  
4. Removable media is strictly prohibited.  
5. No backups on personal cloud (Google Drive, Dropbox, etc.).  
6. Data retained indefinitely unless archived.  
7. Employee exit process:  
   - Department lead gets OneDrive access (30 days default)  
   - Backup before last working day  
   - Restore data and export Outlook `.pst` within 30 days  
   - OneDrive deleted after 30 days  
8. HRMS database backups:  
   - Retention: 7 days  
   - Frequency: every 5 minutes  

---

## 2. Log Monitoring Procedure

### 2.1 Purpose
Defines log monitoring methodology.

### 2.2 Responsibility
- YOTTABYTE Management  
- Digital Operations Lead  
- DevOps Lead  

### 2.3 Procedure Statements

1. Monitor O365 logs.  
2. Prepare audit report every 2 weeks including:
   - Sign-in failures/success  
   - Locations  
   - MFA usage  
   - Security alerts  
   - Incident severity  
   - Vulnerabilities  
3. Raise incident tickets for anomalies.  
4. DevOps Lead reviews HRMS infrastructure logs.  
5. Review incidents in ISF meetings.  

---

## 3. End User Security Procedure

### 3.1 Purpose
Defines provisioning and security of end-user devices.

### 3.2 Responsibility
- YOTTABYTE Management  
- Digital Operations Lead  

### 3.3 Procedure Statements

### Device Provisioning Checklist

| Safeguard | Requirement | Exception |
|----------|------------|----------|
| Disk Encryption | Use BitLocker or equivalent | No local storage if not feasible |
| Domain Connection | Join YB domain | CEO approval required |
| Network Storage | Use OneDrive | No exceptions |
| Antivirus | Up-to-date antivirus required | CEO approval required |
| Password & MFA | Mandatory | No exceptions |
| Physical Security | Lock device when not in use | No exceptions |
| Patching | Auto updates every 30 days | No exceptions |
| Unauthorized Software | No hacking/P2P tools | Refer policy |
| USB Blocking | Must be enabled | CEO approval required |
| Privileged Access | No admin access | CEO approval required |

- Department leads must report non-compliant devices.

---

## 4. IT Equipment Disposal Procedure

### 4.1 Purpose
Defines secure disposal of IT equipment.

### 4.2 Responsibility
- YOTTABYTE Management  
- Digital Operations Lead  

### 4.3 Procedure Statements

1. Contact Digital Operations for disposal.  
2. Follow environmental guidelines.  
3. Remove/destroy storage media:  
   - Use Certificate of Destruction if outsourced  
   - If removal not possible → secure erasure  
4. Destroy CDs, DVDs, floppy disks, broken drives.  
5. Remove asset from inventory before disposal.  

---

## 5. Technical Vulnerability Management Procedure

### 5.1 Purpose
Defines antivirus, patching, DLP, and scanning requirements.

### 5.2 Responsibility
- YOTTABYTE Management  
- Digital Operations Lead  
- DevOps Lead  
- Information Security Officer  

### 5.3 Procedure Statements

#### 5.3.1 Antivirus and Antimalware
- Install on all systems  
- Update regularly  
- Use trained professionals  
- Evaluate tools before use  
- Maintain patch records  
- Monitor threat intelligence  

#### 5.3.2 Patching and Data Loss Prevention
- Apply patches regularly (every 30 days)  
- Scan all data before use  
- Use DLP in O365  
- Restore operations after incidents  

#### 5.3.3 Vulnerability Scanning
- Scan every 30 days  
- Treat and remediate risks  
- Use approved tools only  
- Share reports with ISO  

---

## 6. ANNUAL REVIEW

Documents must be reviewed annually or upon ISMS updates.  
Internal audits must be conducted yearly and reported to ISF.

---

## 7. RELATED REFERENCES

| Standard | Reference |
|----------|----------|
| ISO/IEC 27001:2022 | Annex A 5.37 |

---

**------------------- End of Document -----------------------**