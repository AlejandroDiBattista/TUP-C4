const { useState } = React;

const App = () => {
  const [page, setPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "login":
        return (
          <Login setPage={setPage} setIsAuthenticated={setIsAuthenticated} />
        );
      case "signUp":
        return <SignUp setPage={setPage} />;
      case "info":
        return <Info setPage={setPage} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="container">
      <NavBar
        setPage={setPage}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      {renderPage()}
    </div>
  );
};

const NavBar = ({ setPage, isAuthenticated, setIsAuthenticated }) => {
  const [isActive, setIsActive] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsAuthenticated(false);
        setPage("home");
      }
    } catch (error) {}
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => setPage("home")}>
            <strong>Home</strong>
          </a>
          <a className="navbar-item" onClick={() => setPage("info")}>
            Info
          </a>
        </div>

        <div className="navbar-end">
          {!isAuthenticated ? (
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-primary"
                  onClick={() => setPage("login")}
                >
                  <strong>Log in</strong>
                </button>
                <button
                  className="button is-link"
                  onClick={() => setPage("signUp")}
                >
                  Sign up
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <button className="button is-danger" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home = () => (
  <div className="container is-fluid">
    <h1 className="title">Welcome to the Auth App</h1>
  </div>
);

const Login = ({ setPage, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setIsAuthenticated(true);
        setPage("info");
      }
    } catch (err) {
      const errorResponse = err.response.data;
      setError((prevErrors) => ({
        ...prevErrors,
        [errorResponse.field]: errorResponse.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Log in</h1>
      {error?.general?.length > 0 && (
        <p className="help is-danger">{error.general}</p>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="ex: stefanoferrari@example.com"
          error={error.email}
        />
        <InputPassword
          label="Password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          error={error.password}
        />
        <div className="field">
          <div className="control">
            <button
              className={`button is-primary ${isLoading ? "is-loading" : ""}`}
              type="submit"
              disabled={isLoading}
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Info = ({ setPage }) => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState();
  useEffect(() => {
    handleGetInfo();
    return setInfo();
  }, []);

  const handleGetInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/info", {
        withCredentials: true,
      });

      if (response.status === 403 || response.status === 401) {
        setPage("home");
      }

      if (response.status === 200) {
        setInfo(response.data);
      }
    } catch (err) {
      const errorResponse = err.response.data;
      setError(errorResponse);
    }
  };
  return (
    <div className="container is-fluid">
      <h1 className="title has-text-light">Info</h1>
      {error && <p className="notification is-danger">{error}</p>}
      {info && (
        <div className="card has-background-grey-darker">
          <header className="card-header">
            <p className="card-header-title has-text-white">User Information</p>
          </header>
          <div className="card-content">
            <div className="content has-text-white">
              <p>
                <strong>First Name:</strong> {info.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {info.lastName}
              </p>
              <p>
                <strong>Email:</strong> {info.email}
              </p>
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item has-text-white">
              Information fetched from server
            </p>
          </footer>
        </div>
      )}
    </div>
  );
};

const SignUp = ({ setPage }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        resetValues();
        setPage("login");
      }
    } catch (err) {
      const errorResponse = err.response.data;
      setError((prevErrors) => ({
        ...prevErrors,
        [errorResponse.field]: errorResponse.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const resetValues = () => {
    setError({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    setFirstName();
    setLastName();
    setEmail();
    setPassword();
    setConfirmPassword();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let errors = {};

    if (password && confirmPassword && password !== confirmPassword) {
      isValid = false;
      errors.password = "Passwords must match";
      errors.confirmPassword = "Passwords must match";
    }

    setError(errors);

    if (isValid) {
      handleSignUp(e);
    }
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Sign up</h1>
      {error?.general?.length > 0 && (
        <p className="help is-danger">{error.general}</p>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="First Name"
          value={firstName}
          setValue={setFirstName}
          placeholder={"ex: Stefano"}
          error={error.firstName}
        />
        <Input
          type="text"
          label="Last Name"
          value={lastName}
          setValue={setLastName}
          placeholder={"ex: Ferrari"}
          error={error.lastName}
        />
        <Input
          type="email"
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="ex: stefanoferrari@example.com"
          error={error.email}
        />
        <InputPassword
          label="Password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          error={error.password}
        />
        <InputPassword
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm Password"
          error={error.confirmPassword}
        />
        <div className="field">
          <div className="control">
            <button
              className={`button is-primary ${isLoading ? "is-loading" : ""}`}
              type="submit"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const InputPassword = ({ label, value, setValue, placeholder, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const hasError = error?.length > 0;

  return (
    <InputContainer label={label} error={error} hasIconsLeft hasIconsRight>
      <input
        className={`input ${hasError ? "is-danger" : ""}`}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        minLength={6}
        required
      />
      <span className="icon is-small is-left">
        <i className="fas fa-lock"></i>
      </span>
      <span
        className="icon is-small is-right"
        onClick={togglePasswordVisibility}
        style={{ cursor: "pointer", pointerEvents: "all" }}
      >
        <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
      </span>
    </InputContainer>
  );
};

const Input = ({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
  error,
}) => {
  const hasError = error?.length > 0;
  let iconClass = "";
  if (type === "email") {
    iconClass = "fas fa-envelope";
  } else if (type === "text") {
    iconClass = "fas fa-user";
  }
  return (
    <InputContainer label={label} error={error} hasIconsLeft>
      <input
        className={`input ${hasError ? "is-danger" : ""}`}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required
      />
      <span className="icon is-small is-left">
        <i className={iconClass}></i>
      </span>
    </InputContainer>
  );
};

const InputContainer = ({
  label,
  hasIconsLeft = false,
  hasIconsRight = false,
  children,
  error,
}) => {
  return (
    <Field>
      {label && <Label text={label} />}
      <Control hasIconsRight={hasIconsRight} hasIconsLeft={hasIconsLeft}>
        {children}
      </Control>
      {error?.length > 0 && <p className="help is-danger">{error}</p>}
    </Field>
  );
};

const Field = ({ children }) => <div className="field">{children}</div>;

const Label = ({ text }) => <label className="label">{text}</label>;

const Control = ({ children, hasIconsLeft, hasIconsRight }) => (
  <div
    className={`control ${hasIconsLeft ? "has-icons-left" : ""} ${
      hasIconsRight ? "has-icons-right" : ""
    }`}
  >
    {children}
  </div>
);