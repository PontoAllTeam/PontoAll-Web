import Breadcrumb from "../Breadcrumb";
import PageTitle from "../PageTitle";

interface BreadcrumbPageTitleProps {
  title: string;
}

export default function Breadcrumb_PageTitle({
  title,
}: BreadcrumbPageTitleProps) {
  return (
    <div className="bg-neutral-light p-4 px-6 shadow">
      <Breadcrumb />
      <PageTitle title={title} />
    </div>
  );
}
