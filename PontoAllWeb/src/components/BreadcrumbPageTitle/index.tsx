import Breadcrumb from "../Breadcrumb";
import PageTitle from "../PageTitle";

interface BreadcrumbPageTitleProps {
  title: string;
}

export default function BreadcrumbPageTitle({
  title,
}: BreadcrumbPageTitleProps) {
  return (
    <div className="p-4 px-6">
      <Breadcrumb />
      <PageTitle title={title} />
    </div>
  );
}
