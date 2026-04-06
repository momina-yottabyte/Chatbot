# Business Continuity & Disaster Recovery Plan (BCP/DRP)

## Overview

This document defines the Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP) for YOTTABYTE. It ensures the recovery of critical business functions and IT services during major disruptions.

---

## Purpose

This plan enables:

- Continuity of mission-critical processes
- Recovery of business operations after disruptions
- Clear communication within the organization and with external stakeholders

It minimizes:

- Decision-making during crises
- Dependency on specific individuals
- Need for creating new procedures during recovery

---

## Scope

- Covers major disruptions affecting YOTTABYTE services
- Focuses on AWS infrastructure failures
- Does NOT cover short-term interruptions

---

## Key Assumptions

- AWS availability zones may become unavailable
- Employee safety is the top priority
- Backup systems and replication are in place
- Staff can connect via alternate internet sources
- Systems like Microsoft 365 remain operational
- Cross-trained staff can handle disruptions

---

## Business Recovery Priorities

1. HRMS Production Environment  
2. HRMS Staging and Development Environment  

---

## Relocation Strategy

- No physical relocation required
- Operations are fully remote and cloud-based

---

## Alternate Business Site

- Uses alternate AWS Availability Zones (AZs)
- Example region:
  - US East (N. Virginia)
  - Multiple AZs (us-east1a to us-east1e)

---

## Recovery Plan

### Recovery Phases

#### 1. Plan Activation

- Triggered when disruption exceeds normal handling
- Activated if outage lasts more than 8 hours

Key Metrics:

- RDS Database:
  - RTO: 1 hour
  - RPO: 30 minutes
- HRMS Frontend:
  - RTO: 1 hour
  - RPO: 10 minutes

Actions:

- Monitor system for first 8 hours
- Notify stakeholders
- Escalate to CEO if outage continues
- Activate BCP if required

---

#### 2. Restore in Alternate Environment

- Switch to alternate AWS AZ or region
- Restore system using snapshots
- Test connectivity and data integrity
- Resume operations

---

#### 3. Return to Primary Environment

- Restore systems back to primary AWS region
- Sync data from alternate environment
- Resume normal operations

---

## AWS Backup Strategy

- Nightly snapshots across all AZs
- Real-time replication for HRMS systems
- RDS backups every 5 minutes

---

## Maintenance & Testing

- Reviewed annually or after major changes
- Tested regularly using:

### Testing Types

- **Tabletop Exercise**
  - Discussion-based simulation
  - No system impact

- **Component Testing**
  - Tests specific recovery processes

- **Full Integration Testing**
  - Complete system recovery simulation (every 2 years)

---

## BCP/DRP Teams

### Business Recovery Team (BRT)

Roles include:

- CEO (Crisis Manager)
- Project Manager (BRT Lead)
- Information Security Officer
- Department Leads

---

## Responsibilities

- Activate recovery plan
- Notify stakeholders
- Coordinate recovery teams
- Maintain and update plan
- Document recovery steps
- Participate in testing

---

## Annual Review

- Conducted annually or when required
- Includes internal audits and updates

---

## References

- ISO/IEC 27001:2022  
  (Clauses A.5.29, A.5.30)

---

## O365 Disaster Recovery Strategy

Microsoft provides:

- 99.9% availability
- Highly resilient cloud storage
- Automated disaster recovery
- Near-zero data loss (RPO ~ 0)

### Features

- OneDrive & OneDrive for Business
- Windows Sync
- Enterprise State Roaming

---

## Failure Handling

In case of failures:

- System automatically shifts workloads
- Users may experience temporary disruption
- Sessions must be reconnected after recovery

---

## Roles & Responsibilities (O365)

### Microsoft

- Provides infrastructure and failover
- Manages data replication
- Initiates recovery

### YOTTABYTE

- Approves failover if data loss occurs
- Monitors business continuity

---

## Summary

This plan ensures that:

- Critical systems remain operational
- Data loss is minimized
- Recovery is fast and structured
- Business impact is reduced during disruptions