using KTask.Test.Api7.Utils;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.DTO;

namespace KTask.Test.Api7;
public class EmployeeControllerTesting : IClassFixture<TestAppFactory<Program>>
{
    private readonly TestAppFactory<Program> _appFactroy;
    private readonly HttpClient _httpClient;

    public EmployeeControllerTesting(TestAppFactory<Program> appFactroy)
    {
        _appFactroy = appFactroy;
        _httpClient = appFactroy.CreateClient();
    }

    public static IEnumerable<object[]> SuccessSaveGridData()
    {
        yield return new object[] { new CreateEmpDTO { FullName = "Alex", Position = "CEO", password = "123" } };
        /*yield return new object[] { new CreateEmpDTO { FullName = "John", Position = "Manager", password = "123" } };*/

    }

    public static IEnumerable<object[]> FieldSaveGridData()
    {
        yield return new object[] { new CreateEmpDTO { FullName = "Alex1", Position = "CEO", password = "123" } };
        yield return new object[] { new CreateEmpDTO { FullName = "John", Position = "", password = "123" } };

    }

    [Theory]
    [MemberData(nameof(SuccessSaveGridData))]
    public async Task PostResOk(CreateEmpDTO empDTO)
    {
        var response = await _httpClient.GetAsync("api/e?fullName=1&take=10&skip=1");

        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();

        var csrfToken = await response.Content.ReadAsStringAsync();
        csrfToken = JsonConvert.DeserializeObject<dynamic>(csrfToken)!.antiForgeryToken;

        var formData = new Dictionary<string, string> {
            {"fullName", empDTO.FullName.ToString()},
            {"position", empDTO.Position.ToString()},
            {"password", empDTO.password.ToString()},
            {"X-CSRF-TOKEN",csrfToken }
        };



        var content = new FormUrlEncodedContent(formData);


        var response1 = await _httpClient.PostAsync("api/e/CreateEmployee", content);

        response1.EnsureSuccessStatusCode();
        Assert.True(response1.IsSuccessStatusCode);

    }




    [Theory]
    [MemberData(nameof(FieldSaveGridData))]
    public async Task PostResField(CreateEmpDTO empDTO)
    {
        var response = await _httpClient.GetAsync("api/e?fullName=1&take=10&skip=1");

        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();

        var csrfToken = await response.Content.ReadAsStringAsync();
        csrfToken = JsonConvert.DeserializeObject<dynamic>(csrfToken)!.antiForgeryToken;

        var formData = new Dictionary<string, string> {
            {"fullName", empDTO.FullName.ToString()},
            {"position", empDTO.Position.ToString()},
            {"password", empDTO.password.ToString()},
            {"X-CSRF-TOKEN",csrfToken }
        };



        var content = new FormUrlEncodedContent(formData);


        var response1 = await _httpClient.PostAsync("api/e/CreateEmployee", content);


        Assert.False(response1.IsSuccessStatusCode);
    }

    

}

