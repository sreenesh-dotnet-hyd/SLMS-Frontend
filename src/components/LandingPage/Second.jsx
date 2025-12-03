import {
  Monitor,
  AppWindow,
  Users,
  ShieldCheck,
  Clock,
  Ticket,
} from "phosphor-react";

export default function Second() {
  return (
    <div className="second-container">
      <div className="second-text">
        Why IT Teams prefer this?
      </div>

      <div className="second-content">
        <div className="second-sub-1">
          <div className="second-sub-card tilt-card">
            <div className="second-bg-logo">
              <AppWindow size={200} />
            </div>
            <span className="second-card-pill">Catalog module</span>
            <span className="second-card-title">
              Software Catalog Management
            </span>
            <span className="second-card-content">
              Effortlessly manage your organization’s complete software library.
              The Software Catalog module allows you to create, maintain,
              and explore all software entries in one place.
            </span>
          </div>

          <div className="second-sub-card tilt-card">
            <div className="second-bg-logo">
              <Monitor size={200} />
            </div>
            <span className="second-card-pill">Inventory</span>
            <span className="second-card-title">
              Device Inventory Management
            </span>
            <span className="second-card-content">
              Track and manage all organizational devices with full visibility
              into their configuration and installed software.
              This module helps you maintain accurate device records and ensure
              compliance across your environment.
            </span>
          </div>

          <div className="second-sub-card tilt-card">
            <div className="second-bg-logo">
              <Users size={200} />
            </div>
            <span className="second-card-pill">Identity</span>
            <span className="second-card-title">
              User Management
            </span>
            <span className="second-card-content">
              Manage every user in your organization with complete visibility
              into their licenses and assigned devices.
              The User Management module brings together user identity, entitlements,
              and device ownership in one unified view.
            </span>
          </div>
        </div>

        <div className="second-sub-2">
          <div className="second-sub-card tilt-card">
            <div className="second-bg-logo">
              <ShieldCheck size={200} />
            </div>
            <span className="second-card-pill">Compliance</span>
            <span className="second-card-title">
              License &amp; Compliance Management
            </span>
            <span className="second-card-content">
              Your central hub for tracking software licenses, vendor contracts,
              entitlements, and real-world usage. The License Management module
              ensures full compliance, avoids overspending, and gives you total
              control over your licensing landscape.
            </span>
          </div>

          <div className="second-sub-card tilt-card">
            <div className="second-bg-logo">
              <Clock size={200} />
            </div>
            <span className="second-card-pill">History</span>
            <span className="second-card-title">
              Installation Tracking &amp; History
            </span>
            <span className="second-card-content">
              Gain full visibility into software installations across every device.
              This module helps you track installed versions, monitor changes over time,
              and maintain accurate compliance and audit records in one place.
            </span>
          </div>

          <div className="second-sub-card tilt-card">
            <div className="second-bg-logo">
              <Ticket size={200} />
            </div>
            <span className="second-card-pill">Entitlements</span>
            <span className="second-card-title">
              Entitlement &amp; Seat Allocation
            </span>
            <span className="second-card-content">
              Manage how license seats are distributed across users and devices with complete clarity.
              The Entitlement &amp; Seat Allocation module ensures you never run out of seats
              and stay compliant with vendor limits.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
