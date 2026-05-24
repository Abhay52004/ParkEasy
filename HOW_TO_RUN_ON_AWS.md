# How to Deploy ParkEasy to AWS (From Scratch)

If you have run `terraform destroy` and want to turn your AWS server back on for a presentation, follow these exact steps.

---

### Step 1: Provision the Server
First, we need to ask AWS to build a brand new EC2 server.
1. Open your terminal and navigate to the `terraform` folder:
   ```powershell
   cd C:\Users\CHINMAY\Desktop\Parking_Management_SYSTEM\ParkEasy\terraform
   ```
2. Build the server:
   ```powershell
   terraform apply
   ```
   *(Type `yes` when prompted)*
3. **Important:** When it finishes, it will print out a new `server_public_ip` in green text. Copy that IP address!

---

### Step 2: Update the Code with your New IP
Because AWS gives you a different IP address every time you create a new server, you must update your React frontend to send API requests to the new IP.
1. Go back to your main `ParkEasy` folder in your terminal:
   ```powershell
   cd C:\Users\CHINMAY\Desktop\Parking_Management_SYSTEM\ParkEasy
   ```
2. Run this exact PowerShell command, but **replace `YOUR_NEW_IP`** with the IP address you copied in Step 1!
   ```powershell
   Get-ChildItem -Path frontend\src -Recurse -File -Filter *.jsx | ForEach-Object { (Get-Content $_.FullName) -replace '98.90.205.82:5000', 'YOUR_NEW_IP:5000' | Set-Content $_.FullName }
   ```

---

### Step 3: Package your Code
Compress your code so it can be uploaded to the server quickly:
```powershell
tar.exe -czvf code.tar.gz --exclude=node_modules frontend backend docker-compose.yml
```

---

### Step 4: Upload and Run!
Now we securely send the compressed code to your AWS server and tell Docker to start it.
1. Run this command to upload the file (Replace `YOUR_NEW_IP` with your actual IP!):
   ```powershell
   scp -i terraform\parkeasy-key.pem -o StrictHostKeyChecking=no code.tar.gz ubuntu@YOUR_NEW_IP:~
   ```
2. Run this command to extract the code and start the server:
   ```powershell
   ssh -i terraform\parkeasy-key.pem -o StrictHostKeyChecking=no ubuntu@YOUR_NEW_IP "tar -xzvf code.tar.gz && sudo docker-compose up --build -d"
   ```
*(Note: It will take about 2-3 minutes to finish building).*

---

### Step 5: Seed the Database
Finally, populate the live database with parking spots:
```powershell
ssh -i terraform\parkeasy-key.pem -o StrictHostKeyChecking=no ubuntu@YOUR_NEW_IP "sudo docker-compose exec -T backend node seed.js"
```

**You are done!** You can now open your browser and go to `http://YOUR_NEW_IP:5173` to view your live website!
