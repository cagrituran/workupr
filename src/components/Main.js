// import styled from "styled-components";

// const Main = (props) => {
//   return (
//     <Container>
//       <div className="card gedf-card">
//         <div className="card-header">
//           <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
//             <li className="nav-item">
//               <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
//                 a publication
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a>
//             </li>
//           </ul>
//         </div>
//         <div className="card-body">
//           <div className="tab-content" id="myTabContent">
//             <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
//               <div className="form-group">
//                   <label className="sr-only" htmlFor="message">post</label>
//                   <textarea className="form-control" id="message" rows="3" placeholder="What are you thinking?"></textarea>
//                 </div>
//             </div>
//             <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
//               <div className="form-group">
//                 <div className="custom-file">
//                   <input type="file" className="custom-file-input" id="customFile" />
//                   <label className="custom-file-label" htmlFor="customFile">Upload image</label>
//                 </div>
//               </div>
//               <div className="py-4"></div>
//             </div>
//           </div>
//           <div className="btn-toolbar justify-content-between">
//             <div className="btn-group">
//               <button type="submit" className="btn btn-primary">share</button>
//             </div>
//             <div class="btn-group">
//               <button id="btnGroupDrop1" type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                   <i className="fa fa-globe"></i>
//               </button>
//               <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
//                   <a className="dropdown-item" href="#"><i className="fa fa-globe"></i> Public</a>
//                   <a className="dropdown-item" href="#"><i className="fa fa-users"></i> Friends</a>
//                   <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Just me</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//        <div className="card gedf-card">
//         <div className="card-header">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="d-flex justify-content-between align-items-center">
//               <div className="mr-2">
//                 <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt=""/>
//               </div>
//               <div className="ml-2">
//                 <div className="h5 m-0">@LeeCross</div>
//                 <div className="h7 text-muted">Miracles Lee Cross</div>
//               </div>
//             </div>
//             <div>
//               <div className="dropdown">
//                 <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                   <i className="fa fa-ellipsis-h"></i>
//                 </button>
//                 <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
//                   <div className="h6 dropdown-header">Configuration</div>
//                   <a className="dropdown-item" href="#">Save</a>
//                   <a className="dropdown-item" href="#">Hide</a>
//                   <a className="dropdown-item" href="#">Report</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
//           <a className="card-link" href="#">
//             <h5 className="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
//           </a>
//           <p className="card-text">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor
//               sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste voluptates.
//           </p>
//         </div>
//         <div className="card-footer">
//           <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
//           <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
//           <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
//         </div>
//       </div>
//     </Container>
//     );
// };

// const Container = styled.div`
//   grid-area: main;
// `;

// export default Main;

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import Sharepost from "./Sharepost";

const Main = () => {
  const [data, setData] = useState([]);
  // const [comment, setComment] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7079/api/Post/GetUserFriendsPosts/${JSON.parse(localStorage.getItem('User')).id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const deletePost = async(id)=>{
    // console.log(id);
    axios.delete(`https://localhost:7079/api/Post/DeleteUserPost/${id}`);
    // window.location.reload(); // tekrar request atmak yerine sadece state güncellemesi kafi :)
    console.log(data);
    const newPosts = data.filter(m=>m.id!==id);
    console.log(newPosts);
    
    setData(newPosts);
    
    
  }

  return (
    
    <Container>
    <div>
      <Sharepost/>
    </div>
    
    <div>
      {data.map((item) => {
        // fetch(`https://localhost:7079/api/PostComment/GetPostComments/${item.id}`).then((response) => response.json())
        // .then((data) => setComment(data));
        // console.log(comment)
        console.log(item);
        return(
        <li key={item.id}>
          <Post likers={item.postLikeIds} postLike = {item.postLike} deletePostProp = {deletePost} postId={item.id} publisherId={item.publisherId} postType={item.postType} name={item.name} postTitle={item.postTitle} lastName={item.lastName} createdOn={item.createdOn}></Post>
        </li>);
      })}
    </div>
    

    </Container>
    
  );
};

const Container = styled.div`
  grid-area: main;
`;

export default Main;
