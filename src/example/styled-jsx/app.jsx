export default function MyComponent() {
  const Test2 = () => <div className='div1'>test2</div>
  
  return (
    <div>
      <div className="div1">test1</div>
      <div className="div2">test3</div>
      <Test2 />
      <style jsx>
        {`
          & :global(.div1,.div2) {
              color: red;
              font-size: 16px; 
            
          }
        `}
      </style>
    </div>
  )
}