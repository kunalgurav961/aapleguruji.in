import { useState } from "react";
import { toast } from "react-toastify";
import { BadgeCheck, Check, GraduationCap, X } from "lucide-react";

const AdminPandits = ({ pandits, onUpdate, isLoading }) => {
  const [busyId, setBusyId] = useState("");

  const updateStatus = async (panditId, status) => {
    setBusyId(panditId);
    try {
      await onUpdate(panditId, status);
    } catch (error) {
      toast.error(error || "Unable to update this application.");
    } finally {
      setBusyId("");
    }
  };

  return (
    <section className="adm-panel adm-applications">
      <header className="adm-panel__header">
        <div>
          <h3>Guruji verification queue</h3>
          <p>Review Vedic qualifications and approve or reject pending applications.</p>
        </div>
        <span className="adm-count-badge">{pandits.length} pending</span>
      </header>
      {isLoading ? (
        <p className="adm-empty">Loading pandit applications…</p>
      ) : pandits.length === 0 ? (
        <p className="adm-empty">There are no pandit applications awaiting review.</p>
      ) : (
        <div className="adm-applications__list">
          {pandits.map((pandit) => (
            <article className="adm-application-card" key={pandit._id}>
              <div className="adm-application-card__identity">
                <span className="adm-avatar"><GraduationCap size={19} /></span>
                <div>
                  <h4>{pandit.fullName}</h4>
                  <p>{pandit.email} · {pandit.mobileNumber}</p>
                </div>
                <span className="adm-status is-pending">Pending review</span>
              </div>
              <dl>
                <div><dt>Location</dt><dd>{pandit.city || "Not provided"}</dd></div>
                <div><dt>Vedic shakha</dt><dd>{pandit.vedicShakha || "Not provided"}</dd></div>
                <div><dt>Experience</dt><dd>{pandit.experience || "Not provided"}</dd></div>
                <div><dt>Applied</dt><dd>{pandit.createdAt ? new Date(pandit.createdAt).toLocaleDateString("en-IN") : "—"}</dd></div>
              </dl>
              <div className="adm-application-card__actions">
                <button
                  disabled={busyId === pandit._id}
                  onClick={() => updateStatus(pandit._id, "approved")}
                  type="button"
                >
                  <Check size={15} /> Approve Guruji
                </button>
                <button
                  disabled={busyId === pandit._id}
                  onClick={() => updateStatus(pandit._id, "rejected")}
                  type="button"
                >
                  <X size={15} /> Reject application
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="adm-privacy-note">
        <BadgeCheck size={15} />
        Approval updates the application status. Account credentials are never shown here.
      </p>
    </section>
  );
};

export default AdminPandits;
