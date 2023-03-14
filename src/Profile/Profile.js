export default function Profile({profile, handleClick}) {
  return (
    <div className="profile">
      {profile && (
        <>
          <img
            className="profile__picture"
            src={profile.picture}
            alt="profile"
          />
          <span className="profile__name">{profile.name}</span>
        </>
      )}
      <button className="profile__login-button" onClick={handleClick}>
        {profile ? 'logout' : 'login'}
      </button>
    </div>
  );
}
