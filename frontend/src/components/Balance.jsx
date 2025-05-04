export const Balance = ({ value }) => {
   return <div className="flex items-center">
      <div className="font-bold text-2xl text-green-500">
         Your balance
      </div>
      <div className="font-semibold ml-4 text-xl">
         Rs {value}
      </div>
   </div>
}