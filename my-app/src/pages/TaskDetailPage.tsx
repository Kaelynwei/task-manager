import { useParams, useNavigate } from 'react-router-dom';
import { type Task } from '../Type';



function TaskDetailPage({ tasks }: { tasks: Task[] }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks.find(t => t.id === Number(id));

    return (
		<div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
			<div style={{ 
				border: '1px solid #ddd', 
				borderRadius: '8px', 
				boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
				overflow: 'hidden',
				backgroundColor: '#fff'
			}}>
				<div style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderBottom: '1px solid #ddd' }}>
					<h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>{task?.name}</h2>
				</div>
			
				<div style={{ padding: '20px' }}>
					<div style={{ marginBottom: '20px' }}>
						<h5 style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}> Description</h5>
						<p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444' }}>{task?.description}</p>
					</div>
					<div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
						<h5 style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}>Due Date</h5>
						<p style={{ color: '#888' }}>{task?.dueDate}</p>
					</div>
					<div style={{ marginTop: '30px' }}>
						<button onClick={() => navigate('/')}
							style={{ 
								padding: '10px 20px', 
								backgroundColor: '#6c757d', 
								color: 'white', 
								border: 'none', 
								borderRadius: '4px', 
								cursor: 'pointer',
								transition: 'opacity 0.2s'
							}}
							onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
							onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
							>
							Back to List
						</button>
					</div>
				</div>
			</div>            
		</div>
    );
}

export default TaskDetailPage;

