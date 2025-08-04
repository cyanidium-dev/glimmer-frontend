import Container from "../container/Container";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Breadcrumb[];
  className?: string;
}

export default function Breadcrumbs({
  crumbs,
  className = "",
}: BreadcrumbsProps) {
  return (
    <Container className={className}>
      <nav
        aria-label="breadcrumbs"
        className={`flex items-center pb-4 lg:pb-8 pt-2 lg:pt-4`}
      >
        <ul className="flex items-center flex-wrap">
          {crumbs.map((crumb, index) => (
            <li
              key={crumb.href}
              className={`flex items-center text-[10px] lg:text-[12px] font-light leading-[120%]`}
            >
              {index === crumbs.length - 1 ? (
                <>
                  <span>{crumb.label}</span>
                </>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="outline-none active:text-main xl:hover:text-main focus-visible:text-main transition duration-300 ease-out"
                  >
                    {crumb.label}
                  </Link>
                  <span className="inline-block mx-2">/</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
