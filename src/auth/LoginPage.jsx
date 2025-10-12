import { useState, useEffect } from "react";
import { EyeIcon } from "../components/Icons";
import { supabase } from "../config/supabaseClient";

const EyeSlashIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
);

function DarkModeToggle() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (on) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
      }
    } catch (e) {
      // noop
    }
  }, [on]);

  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-transparent border border-gray-200 dark:border-transparent shadow-sm"
      title={on ? "Switch to light mode" : "Switch to dark mode"}
    >
      {on ? (
        <svg
          className="w-5 h-5 text-yellow-400 icon-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-700 icon-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

// Dispatch a global event when dark mode changes so parent components can react
// (we keep DarkModeToggle self-contained but notify the page).
// Note: DarkModeToggle already writes localStorage and toggles the `dark` class.

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    try {
      return (
        localStorage.getItem("darkMode") === "true" ||
        document.documentElement.classList.contains("dark")
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "darkMode") setIsDark(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      window.removeEventListener("storage", onStorage);
      observer.disconnect();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      // // 1) Login Supabase
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // console.log("Résultat Supabase:", { data, error });
  
      // if (error) {
      //   setError(error.message || "Email ou mot de passe incorrect");
      //   setLoading(false);
      //   return;
      // }
      // if (!data?.session) {
      //   setError("Aucune session créée");
      //   setLoading(false);
      //   return;
      // }
  
      // // 2) Sauvegarder la session immédiatement (ne pas bloquer sur l’API)
      // const token = data.session.access_token;
      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify({ user: data.user, session: data.session }));
  
      // // 3) Essayer de récupérer le profil (best-effort, NON bloquant)
      // try {
      //   const apiUrl = `${process.env.REACT_APP_API_URL}/api/auth/profile`;
      //   const resp = await fetch(apiUrl, {
      //     headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      //   });
      //   if (resp.ok) {
      //     const profile = await resp.json();
      //     const saved = JSON.parse(localStorage.getItem("user") || "{}");
      //     localStorage.setItem("user", JSON.stringify({ ...saved, profile: profile.data }));
      //   } else {
      //     const txt = await resp.text();
      //     console.warn("Profil API non disponible:", resp.status, txt);
      //   }
      // } catch (e2) {
      //   console.warn("Erreur profil (ignorée pour ne pas bloquer):", e2);
      // }
  
      // // 4) Recharger -> App.js lira la session et routera selon le rôle
      // window.location.href = "/";
      // Connexion via Supabase
      // ...
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        // // 1) Appel backend pour le profil
        // const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        //   headers: { Authorization: `Bearer ${data.session.access_token}` }
        // })
        // if (!resp.ok) throw new Error(await resp.text())
        // const profilePayload = await resp.json()

        // // 2) Stocker user + session + profile ensemble
        // const userData = {
        //   user: data.user,
        //   session: data.session,
        //   profile: profilePayload.data || profilePayload // selon ton ok()
        // }
        // localStorage.setItem('user', JSON.stringify(userData))
        // localStorage.setItem('token', data.session.access_token)

        // // 3) Recharger / rediriger
        // window.location.replace('/')   // évite un re-render bancal

        // 1) appeler le backend et éviter le cache
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache'
          },
          cache: 'no-store'
        })
        if (!resp.ok) throw new Error(await resp.text())
        const profilePayload = await resp.json()
        const profile = profilePayload.data ?? profilePayload   // selon ton ok()

        // 2) écrire user + session + profile DANS LA MÊME ENTRÉE
        const userData = { user: data.user, session: data.session, profile }
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', data.session.access_token) // utile pour Postman/HTTP

        // 3) naviguer (pas de reload avant setItem)
        window.location.replace('/') 



    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError(err.message || "Erreur de connexion");
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden flex flex-col">
      {/* Decorative layered blobs + subtle waves background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large blurred blobs - increased opacity and reduced blur for visibility */}
        <div className="absolute -left-40 -top-40 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-90 filter blur-2xl transform rotate-12" />
        <div className="absolute right-[-120px] top-24 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-85 filter blur-xl" />
        <div className="absolute left-1/4 bottom-[-80px] w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-150 rounded-full opacity-80 filter blur-xl" />

        {/* Subtle wave lines (SVG) - extended with more curves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
        >
          <path
            d="M0 260 C180 200 360 320 600 300 C840 280 980 240 1200 260"
            stroke="#EAD7FF"
            strokeWidth="3"
            fill="none"
            opacity="0.28"
          />
          <path
            d="M0 300 C200 220 400 380 600 320 C800 260 1000 360 1200 300"
            stroke="#E9D5FF"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M0 340 C150 300 350 260 600 300 C850 340 1050 300 1200 320"
            stroke="#F7CFEA"
            strokeWidth="2"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M0 380 C240 320 420 360 600 360 C780 360 980 320 1200 340"
            stroke="#FAD8EB"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M0 420 C200 460 400 420 600 430 C800 440 1000 420 1200 430"
            stroke="#EED6FF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M0 200 C220 160 420 180 600 200 C780 220 980 200 1200 220"
            stroke="#F6E7F6"
            strokeWidth="1.5"
            fill="none"
            opacity="0.22"
          />
        </svg>
      </div>

      {/* Navbar (styled) */}
      <header className="w-full py-6 relative">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 shadow-md flex items-center justify-center">
              <span className="text-white font-extrabold">M</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">
                Welcome back
              </div>
              <div className="text-xs text-gray-400">Good to see you</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <DarkModeToggle />
            <div className="text-right">
              <div className="text-lg font-semibold text-indigo-900">
                MoovUp Admin
              </div>
              <div className="text-xs text-indigo-500">
                Management Dashboard
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Top (mobile): image panel */}
          <div className="md:hidden flex items-center justify-center relative p-4">
            <div className="relative w-full h-64 sm:h-80 flex items-center justify-center overflow-hidden rounded-t-2xl">
              {/* background and gradient overlay */}
              <div
                className="absolute inset-0 bg-white -z-20"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-300 to-purple-200 opacity-18 z-0" />

              {/* image displayed directly on the gradient */}
              <div className="relative z-10 flex items-start justify-center w-full h-full p-6">
                <div
                  className={`mt-6 p-4 shadow-lg overflow-hidden rounded-xl transition-colors ${
                    isDark
                      ? "bg-gray-900 border border-gray-800"
                      : "bg-white border border-transparent"
                  }`}
                >
                  <img
                    src={
                      isDark
                        ? "/360_F_70729688_e6LmCqDepnN0W4t5bwFur48PcPiiEiTj.jpg"
                        : "/gym-exercise-equipment-2d-animation-video.jpg"
                    }
                    alt="hero gym"
                    className={`w-[320px] h-auto object-contain rounded-lg block mx-auto`}
                    onError={(e) => {
                      // fallback to original if any error
                      e.currentTarget.src =
                        "/gym-exercise-equipment-2d-animation-video.jpg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Left (md+): image panel */}
          <div className="hidden md:flex items-center justify-center relative p-6">
            <div className="relative w-full h-full flex items-center justify-center rounded-l-2xl overflow-hidden">
              {/* background and gradient overlay */}
              <div
                className="absolute inset-0 bg-white -z-20"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-300 to-purple-200 opacity-18 z-0" />

              {/* image displayed directly on the gradient + join badge */}
              <div className="relative z-10 w-full h-full flex items-start justify-center p-8">
                <div
                  className={`mt-8 p-6 shadow-lg overflow-hidden rounded-2xl transition-colors ${
                    isDark
                      ? "bg-gray-900 border border-gray-800"
                      : "bg-white border border-transparent"
                  }`}
                >
                  <img
                    src={
                      isDark
                        ? "/360_F_70729688_e6LmCqDepnN0W4t5bwFur48PcPiiEiTj.jpg"
                        : "/gym-exercise-equipment-2d-animation-video.jpg"
                    }
                    alt="hero gym"
                    className={`w-[420px] h-auto object-contain rounded-xl block mx-auto`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/gym-exercise-equipment-2d-animation-video.jpg";
                    }}
                  />
                </div>

                <div className="absolute bottom-6 left-6 p-4 bg-white rounded-lg shadow-md">
                  <div className="text-sm font-semibold text-gray-800">
                    Join our community
                  </div>
                  <div className="text-xs text-gray-600">
                    Insights, updates and support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form panel (swapped) */}
          <div className="p-6 md:p-10 flex items-center justify-center">
            <div className="max-w-md w-full">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
                Log In
              </h2>
              <p className="text-sm md:text-base text-gray-500 mb-6">
                Welcome back! Please enter your details
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs md:text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full border border-gray-200 rounded-md px-3 py-2 md:py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-400"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="text-right mt-2">
                    <button type="button" className="text-xs text-purple-600">
                      forgot password ?
                    </button>
                  </div>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 md:py-3 rounded-md font-medium hover:shadow-lg transition"
                >
                  {loading ? "Log in" : "Log in"}
                </button>

                <p className="text-center text-xs text-gray-400 mt-6">
                  Don't have account?{" "}
                  <button type="button" className="text-purple-600">
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-12 relative z-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700">
                © {new Date().getFullYear()} MoovUp
              </div>
              <div className="text-xs text-gray-500">— Built with care.</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-sm text-indigo-700 hover:underline"
              >
                Terms
              </button>
              <button
                type="button"
                className="text-sm text-indigo-700 hover:underline"
              >
                Privacy
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm px-3 py-2 rounded-full shadow"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom subtle waves */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none -z-0">
        <svg
          className="w-full h-48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 200"
        >
          {/* Stronger multi-peak bottom waves */}
          <path
            d="M0 100 C120 80 240 140 360 120 C480 100 600 80 720 110 C840 140 960 100 1080 120 C1200 140 1200 200 1200 200 L0 200 Z"
            fill="#F6E9F6"
            opacity="0.7"
          />
          <path
            d="M0 120 C150 100 300 160 450 140 C600 120 750 100 900 130 C1050 160 1200 120 1200 200 L0 200 Z"
            fill="#F3DFF3"
            opacity="0.55"
          />
          <path
            d="M0 80 C200 40 400 120 600 90 C800 60 1000 100 1200 80 L1200 200 L0 200 Z"
            fill="#F9EAF8"
            opacity="0.38"
          />
        </svg>
      </div>
    </div>
  );
}
