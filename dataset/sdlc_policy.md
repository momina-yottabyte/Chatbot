# Secure Software Development Policy  
**Information Security Management System**

**Version:** 1.1  

---

## DOCUMENTATION CONTROL SHEET

### Document Description
- **Document Ref:** YB/ISMS/PL/SDLC  
- **Document Name:** Secure Software Development Policy  
- **Document Owner:** YOTTABYTE  

**Document Classification:**
- ☐ Public  
- ☐ Confidential  
- ☒ Internal  
- ☐ Restricted  

**Document Status:**
- ☐ Draft  
- ☒ Issued  
- ☐ Revision  
- ☐ Obsolete  

- **Publish Date:** 18th Sept, 2023  
- **Next Review Date:** 19th Sept, 2024  
- **Target Audience:** YOTTABYTE Employees  
- **Distribution:** SharePoint  

---

## Document Control

### Change Record
| Author | Version | Date | Change Reference |
|--------|--------|------|------------------|
| Manahil Ahmed Khan / Shaur Khaqan | 1.0 | 13th Sept, 2023 | Initial Draft |
| Shaur Khaqan | 1.1 | 9th Oct, 2023 | Added application security requirements |

### Reviewers
| Reviewer | Version | Date | Change Reference |
|----------|--------|------|------------------|
| Information Security Forum (ISF) | 1.0 | 14th Sept, 2023 | Reviewed & finalized |
| Information Security Forum (ISF) | 1.1 | 10th Oct, 2023 | Reviewed |

### Approvers
| Approver | Version | Date | Change Reference |
|----------|--------|------|------------------|
| CEO - Haris Shamsi | 1.0 | 18th Sept, 2023 | Approved |
| CEO - Haris Shamsi | 1.1 | 11th Oct, 2023 | Approved |

---

## TABLE OF CONTENTS
1. Purpose  
2. Scope  
3. Software Development Lifecycle  
4. Policy Statements  
5. Roles and Responsibilities  
6. Annual Review  
7. Related References  

---

## 1. PURPOSE
This policy provides a structured Secure Software Development approach to ensure the safety and security of systems developed by YOTTABYTE.

---

## 2. SCOPE
Applies to all employees, systems, and third parties involved in development or modification of applications within YOTTABYTE ISMS scope.

---

## 3. SOFTWARE DEVELOPMENT LIFECYCLE

### 3.1 Goals and Objectives

**Goals:**
- Deliver secure, high-quality systems  
- Establish repeatable development processes  
- Define roles and responsibilities  
- Ensure requirements are met  

**Objectives:**
- Provide management oversight  
- Maintain requirement traceability  
- Align with IT infrastructure  
- Ensure compliance with laws and standards  

---

### 3.2 SDLC Phases

#### 3.2.1 Planning Phase
- Gather requirements from stakeholders  
- Identify users and objectives  

#### 3.2.2 Design Phase
- Define system architecture  
- Identify security requirements  

#### 3.2.3 Development Phase
- Convert design into code  
- Ensure maintainability and reusability  
- Conduct code reviews  

#### 3.2.4 Testing Phase
- Perform continuous testing  
- Identify and fix defects  
- Validate security controls  

#### 3.2.5 Deployment Phase
- Deploy to production after approval  
- Train users  

#### 3.2.6 Maintenance Phase
- Maintain and update system  
- Finalize project deliverables  

---

## 4. POLICY STATEMENTS

### 4.1 Document Software Development
- Document all SDLC phases  
- Maintain approval records  

---

### 4.2 Risk Management
- Perform risk assessments for all applications  

---

### 4.3 Application Design
Include:
- Input validation  
- Data flow and output controls  
- Logging and monitoring  
- Cryptography  

**OWASP Top 10 Considerations:**
- Broken access control  
- Cryptographic failures  
- Injection  
- Insecure design  
- Security misconfiguration  
- Vulnerable components  
- Authentication failures  
- Data integrity failures  
- Logging failures  
- SSRF  

---

### 4.4 Access Control
- Separate environments (Dev/Test/Prod)  
- Protect sensitive data  
- Limit developer access to production  

---

### 4.5 Change Management
- Document change process  
- Approve all changes  
- Perform impact analysis  

---

### 4.6 Testing
- Test in controlled environments  
- Perform security and regression testing  
- Maintain test plans and reports  
- Track defects  

---

### 4.7 Version Control and Backups
- Use version control systems  
- Restrict repository access  
- Maintain backups  
- Follow branching strategies  

---

### 4.8 Implementation
- Deploy after approval  
- Separate development and deployment roles  
- Monitor post-deployment  

---

### 4.9 Application Security Requirements
- Follow secure coding practices  
- Refer to SOP – Web Application Security  
- Ensure compliance by team leads  

---

## 5. ROLES AND RESPONSIBILITIES

### CEO (Haris Shamsi)
- Approve projects  
- Oversee governance and compliance  

### Project Manager (Shaheer Latif)
- Manage planning, risks, and execution  
- Ensure deliverables  

### Development Team
- Develop and test software  
- Maintain CI/CD processes  
- Fix defects  

### Business Analyst
- Gather requirements  
- Maintain documentation  

### System Architect (Shaur Khaqan)
- Design system architecture  
- Oversee deployment  

### QA Lead (Shaheer Latif)
- Ensure test coverage  
- Manage testing lifecycle  

### Security Lead (Abu Bakar Gondal)
- Ensure security compliance  
- Conduct risk assessments and audits  

---

## 6. ANNUAL REVIEW
- Reviewed annually or upon ISMS updates  
- Includes audits and compliance checks  

---

## 7. RELATED REFERENCES

| Standard | Reference |
|----------|----------|
| ISO/IEC 27001:2022 | Annex A.8.25 – A.8.33 |

---

**--- End of Document ---**