import MyBooksView from "@/components/my/MyBooksView";

export const metadata = {
  title: "My Books | BookNook",
  description:
    "Manage the books you have added and track your personal library contributions.",
};

const MyBooksPage = () => {
  return <MyBooksView />;
};

export default MyBooksPage;
