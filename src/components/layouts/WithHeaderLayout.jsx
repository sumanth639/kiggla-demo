import Header from '../Header';

const WithHeaderLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default WithHeaderLayout;
