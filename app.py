from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('health.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tracker (
            id INTEGER PRIMARY KEY,
            water INTEGER DEFAULT 0,
            calories INTEGER DEFAULT 0,
            steps INTEGER DEFAULT 0,
            sleep INTEGER DEFAULT 0
        )
    ''')
    cursor.execute('SELECT COUNT(*) FROM tracker')
    if cursor.fetchone()[0] == 0:
        cursor.execute('INSERT INTO tracker (water, calories, steps, sleep) VALUES (0, 0, 0, 0)')
    conn.commit()
    conn.close()

init_db()
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-data')
def get_data():
    conn = sqlite3.connect('health.db')
    cursor = conn.cursor()
    cursor.execute('SELECT water, calories, steps, sleep FROM tracker WHERE id = 1')
    row = cursor.fetchone()
    conn.close()
    return jsonify({
        'water': row[0],
        'calories': row[1],
        'steps': row[2],
        'sleep': row[3]
    })

@app.route('/add', methods=['POST'])
def add():
    data = request.get_json()
    field = data['field']       # kaunsi cheez add karni hai: water/calories/steps/sleep
    value = data['value']       # kitna add karna hai

    conn = sqlite3.connect('health.db')
    cursor = conn.cursor()
    cursor.execute(f'UPDATE tracker SET {field} = {field} + ? WHERE id = 1', (value,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/reset', methods=['POST'])
def reset():
    conn = sqlite3.connect('health.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE tracker SET water = 0, calories = 0, steps = 0, sleep = 0 WHERE id = 1')
    conn.commit()
    conn.close()
    return jsonify({'status': 'reset'})

if __name__ == '__main__':
    app.run(debug=True)