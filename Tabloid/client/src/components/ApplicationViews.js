import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";

export default function ApplicationViews() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const localUser = getCurrentUser();
    
    if(!localUser) {
      setIsLoggedIn(false);
    }

  },[isLoggedIn])

 return(

      !isLoggedIn ?
      <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/login" element={ <Login setIsLoggedIn={setIsLoggedIn} /> } />
          <Route path="/register" element={ <Register setIsLoggedIn={setIsLoggedIn} /> } />
          <Route path="*" element={<Navigate to="/login"/>} />
      </Routes>
      : <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/posts" element={ <PostList /> } />
          {/* <Route path="/posts/add" element={ <PostForm /> } />
          <Route path="/posts/:id" element={ <PostDetails /> } />
          <Route path="/users/:id" element={ <UserPosts /> } /> */}
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Routes>
   );
 
}
