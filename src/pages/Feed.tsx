import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { BottomActivityBar } from "../components/BottomActivityBar";
import { FeedItem } from "../components/FeedItem";
import { FeedNavigationWrapper } from "../components/FeedNavigationWrapper";
import { Logo } from "../components/Logo";
import { Navbar, NavItem } from "../components/Navbar";

const images = [
  "https://wallpaperaccess.com/full/271965.jpg",
  "https://images.ctfassets.net/hrltx12pl8hq/3Q0QDN9wYXdNcxqwhzJQzm/b3a92e16b58cc63c5ede83a1728c9490/LOHP_Makers_FT_hero.jpg?fit=fill&w=800&h=450",
  "https://assets-global.website-files.com/6005fac27a49a9cd477afb63/60576840e7d265198541a372_bavassano_homepage_gp.jpg",
  "https://cdn.britannica.com/67/102267-050-FCC426F5/Town-Banff-Alberta-Canada.jpg",
  "https://static.toiimg.com/photo/77573846/77573846.jpg?v=3",
  "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  "https://wattention.com/wp-content/uploads/2018/04/2860534_l-2.jpg",
  "data:image/jpeg;base64,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",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMz2rqu-PKIYz4agmo8lzKnD96kj1M-c9nOI442VYm_9tjbIu5wZ77G3j4q_fDVxbF1s&usqp=CAU",
  "data:image/jpeg;base64,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",
];

const Feed = () => {
  const [currentPost, setCurrentPost] = useState(0);
  return (
    <div className='bg-black text-white max-h-screen overflow-y-auto'>
      <FeedNavigationWrapper
        handleOnNextClick={() => setCurrentPost(currentPost + 1)}
        handleOnPreviousClick={() => setCurrentPost(currentPost - 1)}
      >
        <Navbar>
          <NavItem to='/'>
            <Logo />
          </NavItem>
          <NavItem to='/user'>
            <FaUserAstronaut size={32} />
          </NavItem>
        </Navbar>
        <FeedItem image_url={images[currentPost]} />
        <BottomActivityBar />
      </FeedNavigationWrapper>
    </div>
  );
};
export default Feed;
