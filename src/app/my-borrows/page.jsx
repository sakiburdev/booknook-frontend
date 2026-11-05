import MyBorrowsView from "@/components/my/MyBorrowsView";

export const metadata = {
  title: "My Borrows | BookNook",
  description:
    "View all your currently borrowed books, check return dates, and manage your active borrows.",
};

const MyBorrowsPage = () => {
  return <MyBorrowsView />;
};

export default MyBorrowsPage;
