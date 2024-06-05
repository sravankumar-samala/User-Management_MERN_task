import ReactLoading from "react-loading";

export default function LoadingView() {
  return (
    <div className="loading-container">
      <ReactLoading color="#18292e" type="spin" width={50} height={50} />
    </div>
  );
}
