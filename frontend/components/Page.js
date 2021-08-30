import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h1>I am a page component</h1>
      {children}
    </div>
  );
}
