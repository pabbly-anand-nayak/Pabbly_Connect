import { CustomStyling } from './custom-styling';
// import { ComponentBlock } from '../../component-block';

// import { ScrollToViewTemplate } from '../../component-template';
// import { ScrollToViewTemplate } from './component-template';

// ----------------------------------------------------------------------

export function TreeView() {
  const DEMO = [
    // {
    //   name: 'Simple tree view',
    //   component: (
    //     <ComponentBlock>
    //       <BasicSimpleTree />
    //     </ComponentBlock>
    //   ),
    // },
    // {
    //   name: 'Rich tree view',
    //   component: (
    //     <ComponentBlock>
    //       <BasicRichTree />
    //     </ComponentBlock>
    //   ),
    // },
    {
      component: <CustomStyling />,
    },
    // {
    //   name: 'Custom icon',
    //   component: (
    //     <ComponentBlock>
    //       <CustomIcons />
    //     </ComponentBlock>
    //   ),
    // },
  ];

  return (
    <>
      {/* <ComponentHero>
        <CustomBreadcrumbs
          heading="Tree View"
          links={[{ name: 'Components', href: paths.components }, { name: 'Tree View' }]}
          moreLink={['https://mui.com/x/react-tree-view/']}
        />
      </ComponentHero> */}

      {/* <ScrollToViewTemplate data={DEMO} /> */}
    </>
  );
}
