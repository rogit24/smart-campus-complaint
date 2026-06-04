function ComplaintCard({
  title,
  category,
  status,
}) {
  return (
    <div className="card shadow mb-3">

      <div className="card-body">

        <h5>{title}</h5>

        <p>
          Category:
          {" "}
          {category}
        </p>

        <span
          className={`badge ${
            status === "Resolved"
              ? "bg-success"
              : status === "Pending"
              ? "bg-warning text-dark"
              : "bg-primary"
          }`}
        >
          {status}
        </span>

      </div>

    </div>
  );
}

export default ComplaintCard;