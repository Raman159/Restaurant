import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽 Restaurant POS</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>New Order</div>
        <div style={styles.card}>Orders</div>
        <div style={styles.card}>Billing</div>
        <div style={styles.card}>Reports</div>
        <div style={styles.card}>Settings</div>
      </div>
    </div>
  );
};

export default Dashboard;

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "20px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
  },
  card: {
    padding: "20px",
    background: "#1f2937",
    color: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
  },
};
