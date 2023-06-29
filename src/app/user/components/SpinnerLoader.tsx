import { ClipLoader } from 'react-spinners';

const SpinnerLoader = () => {
  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      <ClipLoader
        color={'blue'}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default SpinnerLoader;
