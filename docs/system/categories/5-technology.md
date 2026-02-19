# 5 — TECHNOLOGY

| | |
|--|--|
| **Category** | 5 |
| **Name** | TECHNOLOGY |
| **Business Label** | TECHNOLOGY |
| **Personal** | tech, cars, devices, software |
| **Business** | Every system, platform, and piece of infrastructure the organization uses to do its work |

---

## Business Sub-categories

| Sub-category | Description |
|---|---|
| IT Infrastructure & Networks | Servers, networking, data centres, on-prem and cloud foundations |
| Software & Applications | Business software, licensed tools, custom applications |
| Cloud Computing & DevOps | Cloud platforms (AWS, Azure, GCP), CI/CD pipelines, containerisation |
| Cybersecurity & Information Security | Threat protection, access control, SOC, compliance (SOC2, FedRAMP, ISO27001) |
| Data Systems & Databases | Databases, data warehouses, lakes, pipelines |
| ERP, CRM & Business Platforms | SAP, Oracle, Salesforce, HubSpot, and equivalent core platforms |
| Hardware & Devices | Laptops, phones, printers, IoT, physical compute |
| Communication & Collaboration Tools | Email, Slack, Teams, Zoom, intranet |
| APIs & Integrations | How systems talk to each other — middleware, iPaaS, custom connectors |
| Digital Workplace | The complete digital environment employees work within |
| Physical Security Systems | CCTV, access control, alarms, physical infrastructure security |
| Fleet & Equipment | Vehicles, specialist equipment, physical operational tools |

---

## Fits Across Org Types

| Org Type | Example |
|---|---|
| Sole Trader | Phone, laptop, van, accounting software |
| Small Business | POS system, website, booking software, card terminal |
| Startup | Cloud infrastructure, product stack, dev tooling |
| SME | ERP introduction, growing tech stack, network setup |
| Enterprise | SAP, Azure, Salesforce, global network, SOC2, security operations |
| Government | Digital government services, legacy system modernisation, GovCloud |
| University | LMS (Canvas, Blackboard), student information system, research tech |
| K-12 School | Tablets, learning apps, safeguarding software, admin system |
| Nonprofit / NGO | Donor CRM (Salesforce NPSP), grant management software |
| Healthcare | EMR/EHR systems, medical devices, HIPAA-compliant infrastructure |

---

## Orchestrator Routing

Requests classified as **5 TECHNOLOGY** route to:
- New system implementation → Physical Security / CRM / Cloud / ERP / Infrastructure Agent (by domain)
- Security concerns → Physical Security Agent + Risk Agent
- Cloud / DevOps → Cloud Migration Agent
- Platform evaluation → Architect Agent
- Integration work → Architect Agent + relevant domain agent
