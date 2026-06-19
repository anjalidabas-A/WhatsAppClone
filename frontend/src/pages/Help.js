import style from "./Help.module.css";

function Help() {
  return (
    <div className={style.helpContainer}>
      <h1>Help & Support</h1>

      <p>Tell us about your issue and we will look into it.</p>

      <textarea placeholder="Describe your problem here..."></textarea>

      <button>Submit</button>
    </div>
  );
}

export default Help;
