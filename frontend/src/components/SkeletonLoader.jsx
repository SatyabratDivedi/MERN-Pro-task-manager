import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const SkeletonLoader = () => {
  return (
    <>
      <div style={{background: "white", padding: "19px", borderRadius: "14px", marginBottom: "20px"}}>
        <div style={{display: "flex", gap: "10px"}}>
          <Skeleton circle={true} height={10} width={10} />
          <Skeleton height={10} width={50} />
          <Skeleton circle={true} height={15} width={15} />
        </div>
        <Skeleton height={16} width={"90%"} style={{marginBlock: "10px"}} />
        <div style={{display: "flex", justifyContent: "space-between", marginBlock: "10px"}}>
          <Skeleton height={12} width={120} />
          <Skeleton height={16} width={20} />
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
          <Skeleton height={20} width={45} style={{marginTop: "0px"}} />
          <Skeleton height={20} width={45} style={{marginTop: "0px"}} />
          <Skeleton height={20} width={45} style={{marginTop: "0px"}} />
          <Skeleton height={20} width={45} style={{marginTop: "0px"}} />
        </div>
      </div>
    </>
  );
};
export default SkeletonLoader;
