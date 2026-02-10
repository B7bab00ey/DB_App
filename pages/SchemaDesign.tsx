import React from 'react';
import { Database, ArrowRight } from 'lucide-react';

const SchemaDesign: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Database className="text-cyan-400" />
          Database Design & Schema
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Col: ER Description */}
        <div className="space-y-6">
           <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
             <h2 className="text-xl font-semibold text-cyan-400 mb-4 border-b border-slate-700 pb-2">Entity Relationships (ER)</h2>
             <ul className="space-y-3 text-slate-300 text-sm">
               <li className="flex items-start gap-2">
                 <ArrowRight className="w-4 h-4 mt-1 text-cyan-500 shrink-0" />
                 <div>
                   <span className="font-bold text-white">One Movie</span> has <span className="font-bold text-white">Many Showtimes</span> (1:N)
                 </div>
               </li>
               <li className="flex items-start gap-2">
                 <ArrowRight className="w-4 h-4 mt-1 text-cyan-500 shrink-0" />
                 <div>
                   <span className="font-bold text-white">One Hall</span> hosts <span className="font-bold text-white">Many Showtimes</span> (1:N)
                 </div>
               </li>
               <li className="flex items-start gap-2">
                 <ArrowRight className="w-4 h-4 mt-1 text-cyan-500 shrink-0" />
                 <div>
                   <span className="font-bold text-white">One Showtime</span> has <span className="font-bold text-white">Many Bookings</span> (1:N)
                 </div>
               </li>
               <li className="flex items-start gap-2">
                 <ArrowRight className="w-4 h-4 mt-1 text-cyan-500 shrink-0" />
                 <div>
                   <span className="font-bold text-white">One Booking</span> belongs to <span className="font-bold text-white">One Showtime</span> (N:1)
                 </div>
               </li>
             </ul>
           </section>
        </div>

        {/* Right Col: SQL Definitions */}
        <div className="space-y-6">
          <TableDefinition 
            name="Movies" 
            columns={[
              { name: "id", type: "INT", key: "PK" },
              { name: "title", type: "VARCHAR(255)" },
              { name: "genre", type: "VARCHAR(50)" },
              { name: "duration_min", type: "INT" },
              { name: "rating", type: "VARCHAR(10)" }
            ]} 
          />
          <TableDefinition 
            name="Halls" 
            columns={[
              { name: "id", type: "INT", key: "PK" },
              { name: "name", type: "VARCHAR(100)" },
              { name: "capacity", type: "INT" },
              { name: "type", type: "VARCHAR(20)" }
            ]} 
          />
          <TableDefinition 
            name="Showtimes" 
            columns={[
              { name: "id", type: "INT", key: "PK" },
              { name: "movie_id", type: "INT", key: "FK -> Movies.id" },
              { name: "hall_id", type: "INT", key: "FK -> Halls.id" },
              { name: "start_time", type: "DATETIME" },
              { name: "price", type: "DECIMAL(10,2)" }
            ]} 
          />
          <TableDefinition 
            name="Bookings" 
            columns={[
              { name: "id", type: "INT", key: "PK" },
              { name: "showtime_id", type: "INT", key: "FK -> Showtimes.id" },
              { name: "customer_name", type: "VARCHAR(100)" },
              { name: "seat_row", type: "CHAR(1)" },
              { name: "seat_number", type: "INT" },
              { name: "status", type: "ENUM" }
            ]} 
          />
        </div>
      </div>
    </div>
  );
};

// Helper component to draw tables "graphically"
const TableDefinition = ({ name, columns }: { name: string, columns: any[] }) => (
  <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
    <div className="bg-slate-700 px-4 py-2 flex items-center justify-between border-b border-slate-600">
      <span className="font-bold text-white">{name}</span>
      <span className="text-xs text-slate-400 font-mono">TABLE</span>
    </div>
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
        <tr>
          <th className="px-4 py-2 w-1/3">Column</th>
          <th className="px-4 py-2 w-1/3">Type</th>
          <th className="px-4 py-2 w-1/3 text-right">Attributes</th>
        </tr>
      </thead>
      <tbody>
        {columns.map((col, idx) => (
          <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
            <td className="px-4 py-2 font-mono text-cyan-300">{col.name}</td>
            <td className="px-4 py-2 text-slate-300">{col.type}</td>
            <td className="px-4 py-2 text-right">
              {col.key && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${col.key.includes('PK') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {col.key}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SchemaDesign;