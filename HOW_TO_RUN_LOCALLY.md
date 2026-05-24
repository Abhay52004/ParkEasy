# How to Run ParkEasy Locally (Cheat Sheet)

If you have completely shut down the project and want to start it back up on your computer for a demonstration, follow one of these two methods.

---

## Method 1: The Quick Way (Docker Compose)
*This is the easiest way to start the app. It spins up the Frontend, Backend, and Database all at once on your local computer.*

1. Open a terminal in the `ParkEasy` folder.
2. Run this command:
   ```powershell
   docker-compose up --build -d
   ```
3. Wait about 30 seconds for the containers to start.
4. **Open your browser and go to:** `http://localhost:5173`
5. *To stop the app when you are done:* `docker-compose down`

---

## Method 2: The Enterprise Way (Kubernetes)
*Use this method if you want to show off your Kubernetes orchestration skills to your professor/interviewer.*

**Step 1: Start the cluster**
1. Open a terminal in the `ParkEasy` folder.
2. Apply the Kubernetes configuration:
   ```powershell
   kubectl apply -f k8s/
   ```

**Step 2: Connect the Network (Port-Forwarding)**
Because Kubernetes is highly secure, it isolates the app from your browser. You must run these two commands in **two separate terminal windows** and leave them running:

*Terminal A (Frontend):*
```powershell
kubectl port-forward svc/frontend-service 5173:5173
```
*Terminal B (Backend API):*
```powershell
kubectl port-forward svc/backend-service 5000:5000
```

**Step 3: Seed the Database**
Because Kubernetes creates a brand new blank database, you must populate it with parking spots. Open a **third** terminal window and run:
```powershell
docker-compose exec -T backend node seed.js
```
*(Note: If the `docker-compose exec` command fails because docker-compose isn't running, use `docker exec -it <backend-container-id> node seed.js`)*

**Step 4: View the App**
* **Open your browser and go to:** `http://localhost:5173`

**Step 5: Turn it Off**
When you are done with your presentation, turn off Kubernetes so it stops eating your RAM:
```powershell
kubectl delete -f k8s/
```
